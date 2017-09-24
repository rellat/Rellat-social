var jwt = require('jwt-simple')
var User = require('../models/user')

// 이건 아마 중복 확인을 위해서 필요하지 않을까 싶다
// 회원가입 form에서 중복확인 버튼을 만든다던가 할 수 있겠다
module.exports.checkExist = function (req, res) {
  var email = req.body.email || ''
  var password = req.body.password || ''

  if (email === '' || password === '') {
    res.status(401)
    res.json({
      'status': 401,
      'message': 'email : ' + email + ' password : ' + password
    })
    return
  }

  User.findOne({email: email}, function (error, user) {

    if (error) {
      res.status(401)
      res.json({
        'status': 401,
        'message': 'username : ' + email + ' password : ' + password
      })
      return
    }

    if (!user) {
      res.json({
        'status': 'false',
        'message': 'user is not exist'
      })
    } else if (user.email === email) {
      res.json({
        'status': 'true',
        'message': 'user already exist'
      })
    }
  })
}

module.exports.registerUser = function (req, res) {
  var email = req.body.email || ''
  var password = req.body.password || ''
  var username = req.body.name || ''

  if (email === '' || password === '') {
    res.status(401)
    res.json({
      'status': 401,
      'message': 'email : ' + email + ' password : ' + password
    })
    return
  }

  User.findOne({email: email}, function (error, user) {

    if (error) {
      res.status(401)
      res.json({
        'status': 401,
        'message': 'email : ' + email + ' password : ' + password
      })
      return
    }
    // 나중에 following 배열에 넣을 때는 {id : String} 형태로 push 해야한다
    if (!user) {
      var newUser = new User({
        email: email,
        username: username,
        password: password,
        image: '',
        bio: '',
        userRole: 'admin',
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
      'message': 'email : ' + email + ' password : ' + password
    })
    return
  }

  User.findOne({email: email}, function (error, user) {

    if (error) {
      res.status(401)
      res.json({
        'status': 401,
        'message': 'email : ' + email + ' password : ' + password
      })
      return
    }

    if (!user) {
      res.json({
        'status': 'false',
        'message': 'user dosen\'t exist'
      })

    } else if (user.email === email && user.password === password) {
      var data = genToken(user)
      res.json({
        'status': 'true',
        'message': 'validate user',
        'token': data.token,
        'userEmail': user.email,
        'username': user.username
      })
    } else {
      res.json({
        'status': 'false',
        'message': 'non-validate user'
      })
    }

  })

}

// private method
function genToken (user) {
  var expires = expiresIn(7) // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')())

  return {
    token: token,
    expires: expires,
    user: user
  }
}

function expiresIn (numDays) {
  var dateObj = new Date()
  return dateObj.setDate(dateObj.getDate() + numDays)
}