// token 뿐만 아니라 user data도 관리할 예정이다

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