module.exports.getToken = function () {
  if (typeof (Storage) === 'undefined') {
    console.log('This browser is not support web storage')
    return null
  }
  return localStorage.get('token')
}

module.exports.setToken = function (token) {
  if (typeof (Storage) === 'undefined') {
    console.log('This browser is not support web storage')
    return false
  }
  localStorage.setItem('token', token)

  return true
}