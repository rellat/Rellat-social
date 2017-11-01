var profileManager = require('./../login/profileManager')
var request = require('request')
function FeedManager () {
  var self = this

  self.feeds = null
  self.loginHost = window.location.protocol + '//' + window.location.host // default host setting
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
  console.log(token)
  // 토큰이 없다면 login 페이지로 넘어가도록 하고 아니라면 token에서 유저의 id와 email, image 경로 이름 등을 디코드 해서 같이 보낸다
  if (!token) {
    return
  }
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

module.exports = new FeedManager()
