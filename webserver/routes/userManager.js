var jwt = require('jwt-simple')
var User = require('../models/user')

// 이건 아마 중복 확인을 위해서 필요하지 않을까 싶다
// 회원가입 form에서 중복확인 버튼을 만든다던가 할 수 있겠다

module.exports.registerUser = function (req, res) {
  var email = req.body.email || ''
  var password = req.body.password || ''
  var username = req.body.username || ''
  var picture = req.body.picture || ''

  if (email === '' || password === '') {
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
        'message': 'email : ' + email
      })
      return
    }
    // 나중에 following 배열에 넣을 때는 {id : String} 형태로 push 해야한다
    if (!user) {
      var newUser = new User({
        email: email,
        username: username,
        password: password,
        userRole: 'admin',
        picture: picture,
        following: [],
        followers: []
      })

      newUser.save(function (error, data) {
        if (error) {
          res.status(401)
          res.json({
            'status': 401,
            'message': 'oopse unknown error In registerUser'
          })
        }
        else {
          res.json({
            'status': 'true',
            'message': 'successfully registered'
          })
        }
      })
    } else {
      res.json({
        'status': 'false',
        'message': 'user already exist'
      })
    }

  })
}

module.exports.login = function (req, res) {

  var email = req.body.email || ''
  var password = req.body.password || ''

  if (email === '' || password === '') {
    res.status(401)
    res.json({
      'status': 401,
      'message': 'Login failed'
    })
    return
  }

  User.findOne({email: email}, function (error, user) {

    if (error) {
      res.status(401)
      res.json({
        'status': 401,
        'message': 'Login failed'
      })
      return
    }

    if (!user) {
      res.json({
        'status': 'false',
        'message': 'Non-validate user'
      })

    } else {
      user.validatePassword(password, function (err, isMatch) {
        if (err || !isMatch) {
          res.json({
            'status': 'false',
            'message': 'Incorrect email or password'
          })
          return
        }

        var token = genToken(user)
        res.json({
          'status': 'true',
          'message': 'validate user',
          'token': token,
          'profile': {
            'email': user.email,
            'picture': user.picture,
            'userId': user.userId,
            'username': user.username
          }
        })

      }) // end validatePassword
    }// end if
  })// end findOne
}// end login


module.exports.getAllUserList = function (req, res ,next) {

  User.find({}, function (error, users) {

    if (error) {
      res.status(401)
      res.json({
        'status': 401,
        'message': 'error in AllUserList'
      })
    } else {
      res.users = users
      next()
    }
  })
}

module.exports.getOneUserData = function (req, res) {

  var emailinkey = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key']

  if (!emailinkey) {
    res.status(401)
    res.json({
      'status': 401,
      'message': 'email : ' + email
    })
    return
  }

  User.findOne({email: emailinkey}, function (error, user) {
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


// private method
function genToken (user) {

  return jwt.encode({
    exp: expiresIn(2)
  }, require('../config/secret')())
}

function expiresIn (numDays) {
  var dateObj = new Date()
  return dateObj.setDate(dateObj.getDate() + numDays)
}