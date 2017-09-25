var request = require('request')
var tokenManager = require('../dataManager')

module.exports.postFeed = function (contentTitle, contentBody,getFollowers, next,callback) {
  var token = tokenManager.getToken()
  // 토큰이 없다면 login 페이지로 넘어가도록 하고 아니라면 token에서 유저의 id와 email, image 경로 이름 등을 디코드 해서 같이 보낸다
  if (!token) {
    //request('http://localhost:3000/error',)
    return
  }

  var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/v1/feed/postFeed',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-access-token': token
      },
    body: {
      contentTitle: contentTitle,
      contentBody: contentBody
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    if(body.flag){
      getFollowers(next,callback)
    }

  })

}

// 지금은 follow 안 한 것도 볼 수 있도록 이렇게 한건데 나중에는 follow 목록만 보여줄꺼
module.exports.getAllFeed = function (followList, callback) {
  var token = tokenManager.getToken()
  // 토큰이 없다면 login 페이지로 넘어가도록 하고 아니라면 token에서 유저의 id와 email, image 경로 이름 등을 디코드 해서 같이 보낸다
  if (!token) {
    //request('http://localhost:3000/error',)
    return
  }

  var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/v1/feed/AllFeeds',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-access-token': token
      },
    body: {
      followList: followList
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    callback(body)
  })

}