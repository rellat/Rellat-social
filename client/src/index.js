// 먼저 로그인 화면에서 go-register를 누르면 fade out 되도록 한다
var loginformElement = document.getElementById('login-form')
var registerformElement = document.getElementById('register-form')

var registerTxt = document.getElementById('go-register')
registerTxt.addEventListener('click', function () {
  fadeOutIn(loginformElement, registerformElement, 1000)
})

var loginTxt = document.getElementById('go-login')
loginTxt.addEventListener('click', function () {
  fadeOutIn(registerformElement, loginformElement, 1000)
})

function fadeOutIn (outElem, InElement, speed) {
  if (!outElem.style.opacity) {
    outElem.style.opacity = 1
  } // end if

  var outInterval = setInterval(function () {
    outElem.style.opacity -= 0.04
    if (outElem.style.opacity <= 0) {
      clearInterval(outInterval)

      outElem.style.display = 'none'
      InElement.style.display = 'block'
      InElement.style.opacity = 0

      var inInterval = setInterval(function () {
        InElement.style.opacity = Number(InElement.style.opacity) + 0.04
        if (InElement.style.opacity >= 1) clearInterval(inInterval)
      }, speed / 50)
    }
  }, speed / 50)
} // end fadeOut()

var request = require('request')

loginformElement.addEventListener('submit', function (e) {
  e.preventDefault()
  submitLogin(document.loginForm.identifier.value, document.loginForm.password.value, function (msg) {
    console.log('fuck yeah ' + JSON.stringify(msg))
    if (msg.status === 'true') storeTocken(msg.token)
    if (msg.status === 'false') console.log('false popup')
  })
  return false // stop propagating
})

function submitLogin (email, password, callback) {
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

registerformElement.addEventListener('submit', function (e) {
  e.preventDefault()
  submitRegister(document.registerForm.username.value, document.registerForm.identifier.value, document.registerForm.password.value, function (msg) {
    console.log('fuck yeah ' + JSON.stringify(msg))
    if (msg.status === 'true') fadeOutIn(registerformElement, loginformElement, 1000)
    if (msg.status === 'false') console.log('false popup')
  })
  return false // stop propagating
})

function submitRegister (name, email, password, callback) {
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

function storeTocken (token) {
  if (typeof (Storage) === 'undefined') {
    console.log('This browser is not support web storage')
    return
  }

  // Store
  localStorage.setItem('token', token)

  // Retrieve
  console.log(localStorage.getItem('token'))

}

var options = {
  method: 'GET',
  url: 'http://localhost:3000/api/v1/admin/users',
  headers:
    {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'x-key': 'dldnjswo19@gmail.com',
      'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDU3MjcyNTMxMTN9.5yN4JA2IdaaMV0YtD1Cazu76CfoLiyye8KeRYJLri2I'
    },
  json: true
}

request(options, function (error, response, body) {
  if (error) {
    // throw new Error(error)
  }
  // redirect to user page
  console.log(body.userData)
})
