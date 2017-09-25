var User = require('./../models/user')
var jwt = require('jwt-simple')

module.exports.getAllUserList = function (req, res) {

  User.find({}, function (error, users) {

    if (error) {
      res.status(401)
      res.json({
        'status': 401,
        'message': 'error in AllUserList'
      })
    } else {
      res.json({
        'status': 'true',
        'message': 'find all users!',
        'userData': users
      })
    }
  })
}

module.exports.getOneUserData = function (req, res) {
  var email = req.params.email || ''

  if (email === '') {
    res.status(401)
    res.json({
      'status': 401,
      'message': 'email : ' + email
    })
    return
  }

  User.findOne({email: email}, function (error, user) {
    if (error) {
      res.status(401)
      res.json({
        'status': 401,
        'message': 'error in getOneUserData'
      })
    } else if (user) {
      res.json({
        'status': 'true',
        'message': 'find user!',
        'userData': user
      })
    } else {
      res.json({
        'status': 'false',
        'message': 'user doesnt exist'
      })
    }
  })
}

module.exports.updateUser = function (req, res) {
  var newData = req.body
  var email = req.params.email

  if (email === '') {
    res.status(401)
    res.json({
      'status': 401,
      'message': 'email : ' + email
    })
    return
  }

  User.findOne({email: email}, function (error, user) {
    if (error) {
      res.status(401)
      res.json({
        'status': 401,
        'message': 'error in updateUser'
      })
    } else if (user) {
      user.email = newData.email
      user.password = newData.password
      user.userRole = newData.userRole
      user.save(function (error, updatedUser) {
        if (error) {
          res.status(401)
          res.json({
            'status': 401,
            'message': 'error in updateUser/save'
          })
        } else {
          res.json({
            'status': 'true',
            'message': 'update user!',
            'userData': updatedUser
          })
        }
      })
    } else {
      res.json({
        'status': 'false',
        'message': 'user doesnt exist'
      })
    }
  })
}

module.exports.deleteUser = function (req, res) {
  var email = req.params.email

  if (email === '') {
    res.status(401)
    res.json({
      'status': 401,
      'message': 'email : ' + email
    })
    return
  }

  User.remove({email: email}, function (error, user) {
    if (error) {
      res.status(401)
      res.json({
        'status': 401,
        'message': 'error in getOneUserData'
      })
    } else {
      res.json({
        'status': 'true',
        'message': 'user deleted'
      })
    }
  })
}

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
  var token = req.headers['x-access-token']
  var data = jwt.decode(token, require('../config/secret.js')())

  User.find({email: data.email}).exec(function (err, user) {

    if (err) {
      res.error(err)
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

