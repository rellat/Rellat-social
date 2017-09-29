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
    if (!error && body.status === 'true') {
      self.token = body.token
      self.profile = body.profile
      // {
      //   email: user.email,
      //   name: user.username,
      //   picture: user.image,
      //   usrRole: user.userRole
      // }
      window.localStorage.setItem('AuthToken', self.token)
      window.localStorage.setItem('UserProfile', JSON.stringify(self.profile))
    } else {
      error = error || new Error(body.message)
    }
    console.log(window.localStorage.getItem('UserProfile'))
    //callback(error, body)
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