var Feed = require('./../models/feeds')
var User = require('./../models/user')
var Reply = require('./../models/reply')

var _ = require('underscore')

module.exports.getFeedEx = function (req, res) {
  var id = req.body.id
  var profile = req.body.profile

  Feed.findOne({_id:id}).then(function (feed) {
    User.findOne({email: profile.email}).then(function (user) {
      return _.findIndex(user.following,{userEmail:feed.userEmail})
    }).then(function (result) {
      Reply.find({feedId: feed._id}).sort({insertTime: -1}).exec(function (err,replies) {
        if(err) throw new Error(err)
        res.json({
          'feed' : feed,
          'isFollowing': (result !== -1),
          'replies' : replies
        })
      })
    })
  }).catch(function (err) {
    console.error(err)
    res.status(404).send("error in getFeedEx")
  })
}