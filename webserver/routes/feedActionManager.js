var Feed = require('./../models/feeds')
var _ = require('underscore')
module.exports.pressHeart = function (req, res) {
  var feedId = req.body.feedId
  var isLike = req.body.isLike
  var email = req.body.profile.email

  Feed.findOne({_id: feedId}).exec(function (err, feed) {
    if (err) {
      console.log(err)
      res.json({
        'state': false,
        'message': err
      })
      return
    }

    var likeList = feed.likeList

    var index = _.findIndex(likeList, {userEmail: email})

    if (isLike) {
      if (index === -1) {
        likeList.push({userEmail: email})
      }
    } else {
      if (index !== -1) {
        likeList.splice(index, 1)
      }
    }

    feed.save(function (error) {
      if (error) {
        res.json({
          'state': false,
          'message': error
        })
        return
      }
      res.json({'state': true})

    })
  })
}