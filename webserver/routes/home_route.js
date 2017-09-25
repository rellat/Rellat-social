var Feed = require('../models/feeds')
var jwt = require('jwt-simple')

module.exports.getMainPage = function (req, res) {
  res.render('main')
}

// 새로운 feed data를 받았을 때 feed를 생성하고 save 한 다음 모든 feed를 클라이언트에게 전송한다
module.exports.postFeed = function (req, res) {
  var token = req.headers['x-access-token']
  var data = jwt.decode(token, require('../config/secret.js')())

  var feed = new Feed({
    user: data.name,
    userEmail: data.email,
    userImage: data.imgsrc,
    contentTitle: req.body.contentTitle,
    contentBody: req.body.contentBody
  })

  feed.save().then(function () {
    res.json({
      flag : true
    })
  })
}

/**
 *
 * @param req : following 목록이 들어오는 것 같다
 * @param res : following 한 사람들의 글을 찾아서 날짜별로 sorting 후 보내준다
 */

module.exports.getFeeds = function (req, res) {

  if (!req.body.following) {
    Feed.find({})
      .sort({date: -1})
      .exec(function (err, allFeeds) {
        if (err) {
          res.error(err)
        } else {
          res.render('feed', allFeeds)
        }
      })
  } else {
    var requestedFeeds = []

    for (var i = 0, len = req.body.following.length; i < len; i++) {
      requestedFeeds.push({userEmail: req.body.following[i].userEmail})
    }
    Feed.find({$or: requestedFeeds})
      .sort({date: -1})
      .exec(function (err, allFeeds) {
        if (err) {
          res.error(err)
        } else {
          // 조건에 맞는 feed들만 찾아서 보내준다
          res.render('feed', allFeeds)
        }
      })
  }

}

module.exports.getAllFeeds = function (req, res) {

  if (!req.body.followList) {
    Feed.find({})
      .sort({date: -1})
      .exec(function (err, allFeeds) {
        if (err) {
          res.error(err)
        } else {
          res.render('feed', allFeeds)
        }
      })
  } else {
    var requestedFeeds = []

    for (var i = 0, len = req.body.followList.length; i < len; i++) {
      requestedFeeds.push({userEmail: req.body.followList[i].userEmail})
    }

    Feed.find({})
      .sort({date: -1})
      .exec(function (err, allFeeds) {
        if (err) {
          res.error(err)
        } else {
          // 조건에 맞는 feed들만 찾아서 보내준다
          for (var i = 0, len = allFeeds.length; i < len; i++) {
            for (var j = 0, len2 = requestedFeeds.length; j < len2; j++) {
              if (allFeeds[i].userEmail === requestedFeeds[j].userEmail) {
                allFeeds[i].followed = 'followed'
                break
              }
            }
            if (!allFeeds[i].followed) {
              allFeeds[i].follow = 'follow'
            }

          }
          var data = {
            'feeds': allFeeds
          }
          res.render('feed', data)

        }
      })
  }
}