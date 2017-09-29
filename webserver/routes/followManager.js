var User = require('./../models/user')
var jwt = require('jwt-simple')

module.exports.follow = function (req, res) {
  var token = req.headers['x-access-token']
  var data = jwt.decode(token, require('../config/secret.js')())
  var targetId = req.body.targetId
  // 일단 targer followers 목록에 나를 저장한다
  User.find({email: targetId}).exec(function (err, user) {

    if (err) {
      res.error(err)
    } else {
      user[0].followers.push({userEmail: data.email})
      user[0].save()
    }
  })

  User.find({email: data.email}).exec(function (err, user) {

    if (err) {
      res.error(err)
    } else {
      user[0].following.push({userEmail: targetId})
      user[0].save().then(function () {
        res.json(user[0].following)
      })
    }
  })

}
module.exports.unfollow = function (req, res) {
  var token = req.headers['x-access-token']
  var data = jwt.decode(token, require('../config/secret.js')())
  var targetId = req.body.targetId
  // 일단 targer followers 목록에 나를 저장한다
  User.find({email: targetId}).exec(function (err, user) {

    if (err) {
      res.error(err)
    } else {
      for (var i = 0, len = user[0].followers.length; i < len; i++) {
        if (user[0].followers[i].userEmail === data.email) {
          user[0].followers.splice(i, 1)
          user[0].save()
          break
        }
      }
    }
  })

  User.find({email: data.email}).exec(function (err, user) {

    if (err) {
      res.error(err)
    } else {
      for (var i = 0, len = user[0].following.length; i < len; i++) {
        if (user[0].following[i].userEmail === targetId) {
          user[0].following.splice(i, 1)
          user[0].save().then(function () {
            res.json(user[0].following)
          })
          break
        }
      }
    }
  })
}

module.exports.getFollowerList = function (req, res) {
  var emailinkey = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key']

  User.find({email: emailinkey}).exec(function (err, user) {

    if (err) {
      res.error(err)
    }
    if (res.users) {
      res.json({
        users: res.users,
        followers: user[0].followers
      })
    } else {
      res.json(user[0].followers)
    }
  })

}

module.exports.getFollowingList = function (req, res) {
  var token = req.headers['x-access-token']
  var data = jwt.decode(token, require('../config/secret.js')())

  User.find({email: data.email}).exec(function (err, user) {

    if (err) {
      res.error(err)
    } else {
      res.json(user[0].following)
    }
  })

}
