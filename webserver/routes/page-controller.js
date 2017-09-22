

module.exports.getUsersPage = function (req, res) {
  User.find({}, function (error, users) {

    if (error) {
      res.status(401)
      res.json({
        'status': 401,
        'message': 'error in AllUserList'
      })
      return
    }

    var data = {
      "emails" : []
    }

    users.forEach(function (ele) {
      data.emails.push({
        'email': ele.email
      })
    })


    res.render('users', data)
  })
}

module.exports.getMainPage = function (req, res) {
  User.find({}, function (error, users) {

    if (error) {
      res.status(401)
      res.json({
        'status': 401,
        'message': 'error in AllUserList'
      })
      return
    }

    var data = {
      "emails" : []
    }

    users.forEach(function (ele) {
      data.emails.push({
        'email': ele.email
      })
    })


    res.render('main', data)
  })
}