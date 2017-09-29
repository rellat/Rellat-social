/* global DOMException */

var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var request = require('request')

inherits(ProfileManager, EventEmitter)

function ProfileManager () {
  var self = this

  self.token = null
  self.storeable = storageAvailable('localStorage')
  self.profile = null
  // look for saved local token
}

ProfileManager.prototype.verifyUser = function (cb) {
  var self = this
  if (self.storeable) {
    self.token = window.localStorage.getItem('AuthToken')
    self.profile = JSON.parse(window.localStorage.getItem('UserProfile'))

    if (self.token && self.profile) {
      request({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/user/profile',
        headers:
          {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'x-access-token': self.token,
            'x-key': self.profile.email
          },
        json: true
      }, function (error, response, body) {
        // if (error) throw new Error(error)
        // 에러가 발생하면 로그인 화면을 띄우게 한다
        if (error) cb(error)
        else {
          if(body.status === 'true'){
            window.localStorage.setItem('UserProfile', JSON.stringify(self.profile))
            self.goNextPage('/RellatSNS')
            console.log(body)
          }else{
            cb(error)
          }
          // 혹시 업데이트 사항이 있을 수 있으므로 profile을 저장 해 둔다
        }

      })
    } else {
      cb(new Error('Not assigned Token or Profile'))
    }
  } else {
    cb(new Error('localStorage not available'))
  }
}

ProfileManager.prototype.submitLogin = function (email, password, callback) {
  var self = this
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
      //   'email': body.email,
      //   'picture': body.picture,
      //   'userId': body.userId,
      //   'username': body.username
      // }
      window.localStorage.setItem('AuthToken', self.token)
      window.localStorage.setItem('UserProfile', JSON.stringify(self.profile))
      self.goNextPage('/RellatSNS')
    } else {
      error = error || new Error(body.message)
      callback(error, body)
    }
  })
}

ProfileManager.prototype.logout = function (callback) {
  var self = this
  self.token = null
  self.profile = null
  window.localStorage.removeItem('AuthToken')
  window.localStorage.removeItem('UserProfile')
  if (callback) callback()
}

ProfileManager.prototype.submitRegister = function (name, email, password, callback) {
  request({
    method: 'POST',
    url: 'http://localhost:3000/user/registerUser',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      },
    body: {email: email, password: password, username: name},
    json: true
  }, function (error, response, body) {
    if (!error && body.status === 'true') {
      callback(null, body)
    } else {
      error = error || new Error(body.message)
      callback(error, body)
    }
  })
}

ProfileManager.prototype.goNextPage = function (path) {
  var self = this

  window.location.href = 'http://localhost:3000' + path
}

ProfileManager.prototype.getToken = function () {
  var self = this
  self.token = window.localStorage.getItem('AuthToken')
  return self.token
}

ProfileManager.prototype.setToken = function (token) {
  var self = this

  window.localStorage.setItem('AuthToken',token)
  self.token = token
}

ProfileManager.prototype.setProfile = function (profile) {
  var self = this

  window.localStorage.setItem('UserProfile', JSON.stringify(profile))
  self.profile = self.getProfile()
}

ProfileManager.prototype.getProfile = function () {
  var self = this
  self.profile = JSON.parse(window.localStorage.getItem('UserProfile'))
  return self.profile
}

function storageAvailable (type) {
  try {
    var storage = window[type]
    var x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return e instanceof DOMException && (
        // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
  }
}

var prm = new ProfileManager()
window.ProfileManager = prm
module.exports = prm
