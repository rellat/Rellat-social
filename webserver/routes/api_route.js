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
