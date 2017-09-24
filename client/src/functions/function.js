var request = require('request')


module.exports.fadeOutIn = function (outElem, InElement, speed) {
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