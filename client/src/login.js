// 여기선 진짜 form에대한 일만 집중하도록 하자

var tokenManager = require('./auth')
var functionManager = require('./functions/function')

// in login form
var loginformElement = document.getElementById('login-form')

var registerTxt = document.getElementById('go-register')
registerTxt.addEventListener('click', function () {
  functionManager.fadeOutIn(loginformElement, registerformElement, 1000)
})

loginformElement.addEventListener('submit', function (e) {
  e.preventDefault()
  functionManager.submitLogin(document.loginForm.identifier.value, document.loginForm.password.value, function (msg) {

    if (msg.status === 'true') {
      // store token in local storage
      if (!tokenManager.setToken(msg.token)) {
        //error 페이지를 요청하도록 하자
        // 로그인 과정에서 에러가 발생한 것이 아니고 브라우저에서 storage를 요청하지 않은 것 이니까
        // 다른 브라우저를 쓰라는 페이지로 이동하도롣 하자
        //window.location.href = 'localhost:3000/storageError
        return false
      }
      // redirectiong to main page
      window.location.href = 'http://localhost:3000/main'
    }
    if (msg.status === 'false') console.log('false popup')
  })
  return false // stop propagating
})

// in register form
var registerformElement = document.getElementById('register-form')

var loginTxt = document.getElementById('go-login')
loginTxt.addEventListener('click', function () {
  functionManager.fadeOutIn(registerformElement, loginformElement, 1000)
})

registerformElement.addEventListener('submit', function (e) {
  e.preventDefault()
  functionManager.submitRegister(document.registerForm.username.value, document.registerForm.identifier.value, document.registerForm.password.value, function (msg) {
    if (msg.status === 'true') functionManager.fadeOutIn(registerformElement, loginformElement, 1000)
    if (msg.status === 'false') {
      console.log('false popup')
      //이제 여기서는 form에 어느 부분대문에 잘못 되었는지 빨간색으로 표기하게 해 주자
    }
  })
  return false // stop propagating
})
