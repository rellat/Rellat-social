
// 과거에 사용했던 모듈이다 수정이 제대로 끝나면 제거할 것 이다
var feedManager = require('../rest_actions/feed_actions')
var followManager = require('../rest_actions/follow_actions')

var postButton = document.getElementById('postFeedBtn')
var textArea = document.querySelector('textarea')

postButton.addEventListener('click', function () {
  feedManager.postFeed(' ', textArea.value, followManager.getFollowings, feedManager.getAllFeed, inithome)
  textArea.value = ''
})

function initFollowBtn () {
  var followButtons = document.getElementsByClassName('button follow')

  for (var i = 0, len = followButtons.length; i < len; i++) {
    followButtons[i].addEventListener('click', function (e) {
      followManager.follow(e.target.id, feedManager.getAllFeed, inithome)
    })
  }
}

function initFollowedBtn () {
  var followedButtons = document.getElementsByClassName('button followed')

  for (var i = 0, len = followedButtons.length; i < len; i++) {
    followedButtons[i].addEventListener('click', function (e) {
      followManager.unfollow(e.target.id, feedManager.getAllFeed, inithome)
    })
  }
}

function inithome (body) {
  if (body) {
    document.getElementById('feedListTarget').innerHTML = body
  } else {
    // 처음에 불릴 때 follow목록을 받아서 getAllFeed를 실행한다
    followManager.getFollowings(feedManager.getAllFeed, inithome)
  }
  initFollowBtn()
  initFollowedBtn()
}

inithome()
