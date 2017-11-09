var SiteHeader = require('../login/siteHeader')
var loginHeader = new SiteHeader({loginCheck: pageInit})
var template = require('../templates')
var mustache = require('mustache')
var feedManager = require('./feedManager')

function pageInit (isLogedIn) {
  if (isLogedIn) {
    // 기본 구조 render
    document.getElementById('content-body').innerHTML = mustache.render(template['snsHome'])
    // tweetbox init
    initTweetBoxButtons()

    // 서버에서 feed 받아오기
    feedManager.getAllFeed(function (feeds) {
      // render feeds
      var container = document.querySelector('.feeds')
      container.innerHTML = mustache.render(template['feeds'], {'feeds': feeds })
      // reset each feed time
      feedManager.settingFeeds(feeds)
    })
  } else {
    window.location.href = '/'
  }
}

// set event in tweetbox element
function initTweetBoxButtons () {

  var form = document.querySelector('.tweetbox')
  var input = document.querySelector('.tweetbox-message')
  var count = document.querySelector('.tweetbox-count')
  var button = document.querySelector('.tweetbox-button')

  function toggleButton () {
    if (input.value.length === 0) {
      button.setAttribute('disabled', 'disabled')
    } else {
      if(button.disabled) button.removeAttribute('disabled')
    }
  }

  function updateCount () {
    var len = input.value.length
    count.innerHTML = 140 - len
    if (len > 140) {
      count.classList.add('tweetbox-count-error')
    } else {
      count.classList.remove('tweetbox-count-error')
    }
  }

  function postTweet (e) {
    e.preventDefault()
    if (input.value.length > 140) return

    var tweetText = input.value

    feedManager.postFeed(tweetText , function (feeds) {

      var container = document.querySelector('.feeds')
      container.innerHTML = mustache.render(template['feeds'], {'feeds': feeds })

      form.reset()
      feedManager.settingFeeds(feeds)
      toggleButton()
    })
  }

  input.addEventListener('keyup', toggleButton)
  input.addEventListener('keyup', updateCount)
  input.addEventListener('keydown', updateCount)
  form.addEventListener('submit', postTweet)
}