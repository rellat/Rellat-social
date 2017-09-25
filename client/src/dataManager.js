// token 뿐만 아니라 user data도 관리할 예정이다
var jwt = require('jwt-simple')

/**
 *
 * token : {
 *  exp: expiresIn(2),
 *  email: user.email,
 *  name: user.username,
 *  imgsrc:user.image,
 *  usrRole: user.userRole
 * }
 *  만약 유저 데이터가 업데이트 되면 새로 토큰을 발급받아 저장한다
 */

module.exports.getToken = function () {
  if (typeof (Storage) === 'undefined') {
    console.log('This browser is not support web storage')
    return null
  }
  return localStorage.getItem('token')
}

module.exports.setToken = function (token) {
  if (typeof (Storage) === 'undefined') {
    console.log('This browser is not support web storage')
    return false
  }
  localStorage.setItem('token', token)

  return true
}

module.exports.getUserData = function () {
  if (typeof (Storage) === 'undefined') {
    console.log('This browser is not support web storage')
    return null
  }
  var token = localStorage.getItem('token')

  return jwt.decode(token, require('./../../webserver/config/secret')())
}