var request = require('request')
var tokenManager = require('../dataManager')

module.exports.postFeed = function (contentTitle, contentBody) {
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
        'x-key': 'dldnjswo19@gmail.com',
        'x-access-token': token
      },
    body: {
      user: 'wonjerry',
      userEmail: 'dldnjswo19@gmail.com',
      userImage: '',
      contentTitle: contentTitle,
      contentBody: contentBody
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)

    var target = document.getElementById('feedListTarget')
    target.innerHTML = body
  })

}