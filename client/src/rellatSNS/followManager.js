var profileManager = require('./../login/profileManager')
var request = require('request')

function FollowManager () {
  var self = this

  self.followList = null
  self.loginHost = window.location.protocol + '//' + window.location.host // default host setting
}

FollowManager.prototype.follow = function (targetId, callback) {
  var self = this

  request({
    method: 'POST',
    url: self.loginHost + '/api/v1/follow',
    headers:
    {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'x-access-token': profileManager.token
    },
    body: {
      targetId: targetId
    },
    json: true
  }, function (error, response, body) {
    callback(body)
  })
}

FollowManager.prototype.unfollow = function (targetId, callback) {
  var self = this
  request({
    method: 'POST',
    url: self.loginHost + '/api/v1/unfollow',
    headers:
    {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'x-access-token': profileManager.token
    },
    body: {
      targetId: targetId
    },
    json: true
  }, function (error, response, body) {
    callback(body)
  })
}
// 현재 사용자의 follower과 following 배열을 서버로부터 받아올 수 있다
FollowManager.prototype.getFollowers = function (next, callback) {
  var self = this
  request({
    method: 'GET',
    url: self.loginHost + '/api/v1/followerList',
    headers:
    {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'x-access-token': profileManager.token
    },
    json: true
  }, function (error, response, body) {
    callback(body)
  })
}

FollowManager.prototype.getFollowings = function (next, callback) {
  var self = this
  var token = profileManager.getToken()
  if (!token) return

  request({
    method: 'GET',
    url: self.loginHost + '/api/v1/followingList',
    headers:
    {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'x-access-token': token
    },
    json: true
  }, function (error, response, body) {
    callback(body)
  })
}
