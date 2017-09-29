var templates = require('./../templates')
var mustache = require('mustache')

var feedManager = require('./feedManager')

document.body.innerHTML = mustache.render(templates['snsHome'])

var postButton = document.getElementById('postFeedBtn')
var textArea = document.querySelector('textarea')

postButton.addEventListener('click', function () {

  feedManager.postFeed(textArea.value, function (body) {
    var parent = document.getElementById('feedList')
    parent.innerHTML = mustache.render(templates['feed'], {'feeds': body})
  })

  textArea.value = ''
})