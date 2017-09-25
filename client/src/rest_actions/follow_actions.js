var dataManager = require('./../dataManager')
var request = require('request')

module.exports.follow = function (targetId, next, callback) {
  var token = dataManager.getToken()
  if (!token) return

  var userData = dataManager.getUserData()
  if (targetId === userData.email) return

  request({
    method: 'POST',
    url: 'http://localhost:3000/api/v1/follow',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-access-token': token
      },
    body: {
      targetId: targetId
    },
    json: true
  }, function (error, response, body) {
    console.log(body)
    next(body, callback)
  })

}

module.exports.unfollow = function (targetId, next, callback) {
  var token = dataManager.getToken()
  if (!token) return

  var userData = dataManager.getUserData()
  if (targetId === userData.email) return

  request({
    method: 'POST',
    url: 'http://localhost:3000/api/v1/unfollow',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-access-token': token
      },
    body: {
      targetId: targetId
    },
    json: true
  }, function (error, response, body) {
    console.log(body)
    next(body, callback)
  })
}
// 현재 사용자의 follower과 following 배열을 서버로부터 받아올 수 있다
module.exports.getFollowers = function (next, callback) {
  var token = dataManager.getToken()
  if (!token) return

  request({
    method: 'GET',
    url: 'http://localhost:3000/api/v1/followerList',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-access-token': token
      },
    json: true
  }, function (error, response, body) {

    next(body, callback)
  })
}

module.exports.getFollowings = function (next, callback) {
  var token = dataManager.getToken()
  if (!token) return

  request({
    method: 'GET',
    url: 'http://localhost:3000/api/v1/followingList',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-access-token': token
      },
    json: true
  }, function (error, response, body) {

    next(body, callback)
  })

}