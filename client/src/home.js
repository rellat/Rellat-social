var feedManager = require('./rest_actions/feed_actions')

var postButton = document.getElementById('postFeedBtn')
var textArea = document.querySelector('textarea')

postButton.addEventListener('click', function () {

  feedManager.postFeed('first feed',textArea.value)
})




