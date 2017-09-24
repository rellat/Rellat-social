var request = require('request')

module.exports.submitLogin = function (email, password, callback) {
  request({
    method: 'POST',
    url: 'http://localhost:3000/user/login',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      },
    body: {email: email, password: password},
    json: true
  }, function (error, response, body) {
    if (error) throw new Error(error)
    callback(body)
  })
}

module.exports.submitRegister = function (name, email, password, callback) {
  request({
    method: 'POST',
    url: 'http://localhost:3000/user/registerUser',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      },
    body: {email: email, password: password, name: name},
    json: true
  }, function (error, response, body) {
    if (error) throw new Error(error)
    callback(body)
  })
}