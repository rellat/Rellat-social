var profileManager = require('./../login/profileManager')
var request = require('request')

function FollowManager () {
  var self = this

  self.followList = null
  self.loginHost = window.location.protocol + '//' + window.location.host // default host setting
  self.lastCallback = null
}

FollowManager.prototype.follow = function (targetId, callback) {
  var self = this

  var profile = profileManager.getProfile()
  var token = profileManager.getToken()

  request({
    method: 'POST',
    url: self.loginHost + '/api/v1/follow',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-access-token': token,
        'x-key': profile.email
      },
    body: {
      targetId: targetId,
      profile: profile
    },
    json: true
  }, function (error, response, body) {
    console.log(body)
    callback(body)
  })
}

FollowManager.prototype.unfollow = function (targetId, callback) {
  var self = this

  var profile = profileManager.getProfile()
  var token = profileManager.getToken()

  request({
    method: 'POST',
    url: self.loginHost + '/api/v1/unfollow',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-access-token': token,
        'x-key': profile.email
      },
    body: {
      targetId: targetId,
      profile: profile
    },
    json: true
  }, function (error, response, body) {
    console.log(body)
    callback(body)
  })
}
// 현재 사용자의 follower과 following 배열을 서버로부터 받아올 수 있다
FollowManager.prototype.getFollowers = function (next, callback) {
  var self = this
  var profile = profileManager.getProfile()
  var token = profileManager.getToken()

  request({
    method: 'GET',
    url: self.loginHost + '/api/v1/followerList',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-access-token': token,
        'x-key': profile.email
      },
    json: true
  }, function (error, response, body) {
    if (errer) throw new Error
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

FollowManager.prototype.setFollowBtn = function (isFollowing, targetEmail) {
  var self = this
  var profile = profileManager.getProfile()
  //if(targetEmail === profile.email) return

  var button = document.querySelector('.followButton')
  button.style.display = 'inline-block'

  if (isFollowing) button.classList.add('following')

  self.lastCallback = function (e) {
    var state = e.target.classList[1]
    console.log(state)

    if(state === 'following'){
      self.unfollow(targetEmail, function () {
        button.classList.remove('following')
      })
    }else {
      self.follow(targetEmail, function () {
        button.classList.add('following')
      })
    }
  }

  button.addEventListener('click', self.lastCallback.bind(self))
}

module.exports = new FollowManager()