var profileManager = require('./../login/profileManager')
var request = require('request')
var mustache = require('mustache')
var template = require('./../templates')

var followManager = require('./followManager')
var replyManager = require('./replyManager')
var feedActionManager = require('./feedActionManager')
var util = require('./../util')
var _ = require('underscore')

function FeedManager () {
  var self = this

  self.feeds = null
  self.loginHost = window.location.protocol + '//' + window.location.host // default host setting
  self.timeTick = -1
}

FeedManager.prototype.postFeed = function (contentBody, callback) {
  var self = this
  var profile = profileManager.getProfile()
  var token = profileManager.getToken()

  var options = {
    method: 'POST',
    url: self.loginHost + '/api/v1/feed/postFeed',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-access-token': token,
        'x-key': profile.email
      },
    body: {
      contentBody: contentBody,
      profile: profile
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    // 모든 feed가 들어온다
    callback(body)
  })
}
/// /////asfasdalsjdlasnlkdmlkasd 여기부터!!!!!!ㅁㄴ어ㅣㅁ너ㅏ아ㅣㅁㄴ이ㅢㅡ
// 지금은 follow 안 한 것도 볼 수 있도록 이렇게 한건데 나중에는 follow 목록만 보여줄꺼
FeedManager.prototype.getAllFeed = function (callback) {
  var self = this
  var token = profileManager.getToken()
  var profile = profileManager.getProfile()
  // 토큰이 없다면 login 페이지로 넘어가도록 하고 아니라면 token에서 유저의 id와 email, image 경로 이름 등을 디코드 해서 같이 보낸다
  if (!token) {
    return
  }
  // header에 email과 token 둘 다 넣어줘야 한다
  var options = {
    method: 'GET',
    url: self.loginHost + '/api/v1/feed/AllFeeds',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-access-token': token,
        'x-key': profile.email
      },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    // callback으로 모든 feed가 들어온다
    // 후처리는 클라이언트에서 한다
    callback(body)
  })
}

FeedManager.prototype.settingFeeds = function (feeds) {
  var self = this
  var email = profileManager.getProfile().email
  self.resetFeedTimeTick(feeds)

  var contents = Array.from(document.getElementsByClassName('content'))

  contents.forEach(function (content, i) {
    var children = content.children
    //var itemHeader = children[0]
    //var mediaContainer = children[2]
    var textContainer = children[1]
    textContainer.addEventListener('click', self.getExtendFeedData.bind(self, textContainer.id, function (data) {
      document.querySelector('.overlay').style.display = 'block'

      var feedexDiv = document.querySelector('.feed-ex')
      feedexDiv.innerHTML = mustache.render(template['feed-ex'], data.feed)
      feedexDiv.style.display = 'block'

      followManager.setFollowBtn(data.isFollowing, data.feed.userEmail)
      replyManager.setReplyInput()
      replyManager.setReplies(data.replies)

      feedActionManager.setHeartAction(feedexDiv.querySelector('.fa-heart'), data.feed.likeList, data.feed._id)
    }))

    var actions = children[3]
    var acChildren = actions.children
    feedActionManager.setHeartAction(acChildren[1], feeds[i].likeList, textContainer.id)
  })
}

FeedManager.prototype.resetFeedTimeTick = function (feeds) {
  var self = this

  // 시간 갱신을 위해 등록
  self.updateFeedTime(feeds)
  clearInterval(self.timeTick)
  self.timeTick = setInterval(function () { self.updateFeedTime(feeds) }, 3000)
}

FeedManager.prototype.updateFeedTime = function (feeds) {
  var self = this

  feeds.forEach(function (feed) {
    var feedtime = document.getElementById('feed-time-' + feed._id)
    if (!feedtime) return
    feedtime.innerHTML = util.getTimeDifference(new Date(), new Date(feed.insertTime))
  })
}

FeedManager.prototype.closeExtendFeed = function () {
  var self = this

  var feedex = document.querySelector('.feed-ex')
  if (!feedex) return

  if (feedex.style.display === 'block') {
    feedex.style.display = 'none'
    feedex.innerHTML = ''
    replyManager.clearTimeTick()
  }
}

FeedManager.prototype.getExtendFeedData = function (id, callback) {
  var self = this

  var token = profileManager.getToken()
  var profile = profileManager.getProfile()

  // header에 email과 token 둘 다 넣어줘야 한다
  var options = {
    method: 'POST',
    url: self.loginHost + '/api/v1/exFeed',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-access-token': token,
        'x-key': profile.email
      },
    body: {
      id: id,
      profile: profile
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    // callback으로 모든 feed가 들어온다
    // 후처리는 클라이언트에서 한다
    callback(body)
  })
}

module.exports = new FeedManager()
