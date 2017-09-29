var ProfileManager = require('./profileManager')
var util = require('../util')
var template = require('../templates')
var mustache = require('mustache')
//var ChatApp = require('./chat')

document.body.innerHTML = mustache.render(template['login'])

ProfileManager.verifyUser(function (err) {

  // 먼저 로그인 화면에서 go-register를 누르면 fade out 되도록 한다
  var loginformElement = document.getElementById('login-form')

  var registerTxt = document.getElementById('go-register')
  registerTxt.addEventListener('click', function () {
    util.fadeOutIn(loginformElement, registerformElement, 500)
  })

  loginformElement.addEventListener('submit', function (e) {
    e.preventDefault()
    ProfileManager.submitLogin(document.loginForm.identifier.value, document.loginForm.password.value, function (err, msg) {
      // 로그인 실패하면 이 callback이 실행된다
      if (err) {
        throw err
      }
    })
    return false // stop propagating
  })

  var registerformElement = document.getElementById('register-form')

  var loginTxt = document.getElementById('go-login')
  loginTxt.addEventListener('click', function () {
    util.fadeOutIn(registerformElement, loginformElement, 500)
  })

  registerformElement.addEventListener('submit', function (e) {
    e.preventDefault()

    ProfileManager.submitRegister(document.registerForm.username.value, document.registerForm.identifier.value, document.registerForm.password.value, function (err, msg) {
      if (err) {
        throw err
      } else {
        util.fadeOutIn(registerformElement, loginformElement, 500)
      }
    })

    return false // stop propagating
  })

})