var SiteHeader = require('../login/siteHeader')
var loginHeader = new SiteHeader({loginCheck: pageInit})
var template = require('../templates')
var mustache = require('mustache')
var feedManager = require('./feedManager')

function pageInit (isLogedIn) {
  if (isLogedIn) {
    document.getElementById('content-body').innerHTML = mustache.render(template['snsHome'])
    feedManager.getAllFeed(function (feeds) {

      var container = document.querySelector('.feeds')
      container.innerHTML = mustache.render(template['feed'], {'feeds': feeds })

      timeTick(feeds)
      // 시간 갱신을 위해 등록
      if(window.timeTick) clearInterval(window.timeTick)
      window.timeTick = setInterval(function(){
        timeTick(feeds)
      },3000)
    })
    initTweetBoxButtons()
  } else {
    window.location.href = '/'
  }
}

function initTweetBoxButtons () {
  var form = document.querySelector('.tweetbox')
  var input = document.querySelector('.tweetbox-message')
  var count = document.querySelector('.tweetbox-count')
  var button = document.querySelector('.tweetbox-button')

  function toggleButton () {
    if (input.value.length === 0) {
      button.setAttribute('disabled', 'disabled')
    } else {
      button.removeAttribute('disabled')
    }
  }

  function updateCount () {
    count.innerHTML = 140 - input.value.length
    if (this.value.length > 140) {
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
      container.innerHTML = mustache.render(template['feed'], {'feeds': feeds })

      timeTick(feeds)
      form.reset()
      toggleButton()

      // 시간 갱신을 위해 등록
      if(window.timeTick) clearInterval(window.timeTick)
      window.timeTick = setInterval(function(){
        timeTick(feeds)
      },3000)

    })
  }

  input.addEventListener('keyup', toggleButton)
  input.addEventListener('keyup', updateCount)
  input.addEventListener('keydown', updateCount)
  form.addEventListener('submit', postTweet)
}

function applyFeeds(feeds){

}

function getTimeDifference(current, previous) {
  var msPerMinute = 60 * 1000
  var msPerHour = msPerMinute * 60
  var msPerDay = msPerHour * 24
  var msPerMonth = msPerDay * 30
  var msPerYear = msPerDay * 365
  var elapsed = current - previous

  if (elapsed < msPerMinute) return Math.floor(elapsed / 1000) + ' seconds ago'
  else if (elapsed < msPerHour) return Math.floor(elapsed / msPerMinute) + ' minutes ago'
  else if (elapsed < msPerDay) return Math.floor(elapsed / msPerHour) + ' hours ago'
  else if (elapsed < msPerMonth) return Math.floor(elapsed / msPerDay) + ' days ago'
  else if (elapsed < msPerYear) return 'approximately ' + Math.floor(elapsed / msPerMonth) + ' months ago'
  else return Math.floor(elapsed / msPerYear) + ' years ago'
}

function timeTick(feeds){
  feeds.forEach(function (feed) {
    var feedtime = document.getElementById('feed-time-' + feed._id)
    if (!feedtime) return
    feedtime.innerHTML = getTimeDifference(new Date(), new Date(feed.insertTime))
  })
}

function initSidebar () {
  // 나중에 만들기
}