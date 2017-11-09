var User = require('./../models/user')
var jwt = require('jwt-simple')

module.exports.follow = function (req, res) {
  var targetId = req.body.targetId
  var email = req.body.profile.email
  // 일단 targer followers 목록에 나를 저장한다
  User.findOne({email: targetId}).exec(function (err, user) {
    if (err) {
      res.error(err)
    } else {
      user.followers.push({userEmail: email})
      user.save()
    }
  })

  User.findOne({email: email}).exec(function (err, user) {

    if (err) {
      res.error(err)
    } else {
      user.following.push({userEmail: targetId})
      user.save().then(function () {
        // for test
        console.log(user)
        res.json(user.following)
      })
    }
  })

}
// 으어아 나중에 여기좀 어떻게 해야겠다
module.exports.unfollow = function (req, res) {
  var targetId = req.body.targetId
  var email = req.body.profile.email
  // 일단 targer followers 목록에 나를 저장한다
  User.findOne({email: targetId}).exec(function (err, user) {

    if (err) {
      res.error(err)
    } else {
      for (var i = 0, len = user.followers.length; i < len; i++) {
        console.log(user.followers[i])
        if (user.followers[i].userEmail === email) {
          user.followers.splice(i, 1)
          break
        }
      }
    }
    user.save().then(function () {
      User.findOne({email: email}).exec(function (err, user) {
        if (err) {
          res.error(err)
        } else {
          for (var i = 0, len = user.following.length; i < len; i++) {

            if (user.following[i].userEmail === targetId) {
              user.following.splice(i, 1)
              user.save().then(function () {
                res.json(user.following)
              })
              break
            }
          }
        }
      })
    })
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
