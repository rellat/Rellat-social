var User = require('./../models/user')
var Feed = require('../models/feeds')
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

    //res.redirect('/usersPage')
    res.render('users', data)
  })
}

module.exports.getMainPage = function (req, res) {

  Feed.find({})
    .sort({date: -1}).exec(function (err, allFeeds) {
    if (err) {
      res.error(err)
    } else {
      var data = {
        "feeds" : allFeeds
      }
      res.render('main',data)
    }
  })
}