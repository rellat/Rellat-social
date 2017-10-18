var SiteHeader = require('../login/siteHeader')
var loginHeader = new SiteHeader({ loginCheck: pageInit })
var template = require('../templates')
var mustache = require('mustache')

var feedManager = require('./feedManager')

function pageInit (isLogedIn) {
  if (isLogedIn) {
    document.getElementById('content-body').innerHTML = mustache.render(template['snsHome'])

    var postButton = document.getElementById('postFeedBtn')
    var textArea = document.querySelector('textarea')

    postButton.addEventListener('click', function () {
      feedManager.postFeed(textArea.value, function (body) {
        var parent = document.getElementById('feedList')
        parent.innerHTML = mustache.render(template['feed'], { 'feeds': body })
      })

      textArea.value = ''
    })
  } else {
    window.location.href = '/'
  }
}
