var Feed = require('../models/feeds')
/**
 *
 *
 * feed data structure
 * {
 *   user: String,
 *   userEmail: String,
 *   userImage: String,
 *   content: String,
 *   date: {type: Date, default: Date.now}
 * }
 */

// 새로운 feed data를 받았을 때 feed를 생성하고 save 한 다음 모든 feed를 클라이언트에게 전송한다
module.exports.postFeed = function (req, res) {
  var feed = new Feed(req.body)
  feed.save()

  Feed.find({})
    .sort({date: -1}).exec(function (err, allFeeds) {
    if (err) {
      res.error(err)
    } else {
      // 나중엔 응답을 다듬는다.
      res.json(allFeeds)
    }
  })
}

/**
 *
 * @param req : following 목록이 들어오는 것 같다
 * @param res : following 한 사람들의 글을 찾아서 날짜별로 sorting 후 보내준다
 */

module.exports.getFeeds = function (req, res) {
  console.log(req.body)

  if (!req.body.following) {
    Feed.find({})
      .sort({date: -1})
      .exec(function (err, allFeeds) {
        if (err) {
          res.error(err)
        } else {
          res.json(allFeeds)
        }
      })
  } else {
    var requestedWastes = []

    for (var i = 0, len = req.body.following.length; i < len; i++) {
      requestedWastes.push({userEmail: req.body.following[i].userEmail})
    }

    Waste.find({$or: requestedWastes})
      .sort({date: -1})
      .exec(function (err, allFeeds) {
        if (err) {
          res.error(err)
        } else {
          // 조건에 맞는 feed들만 찾아서 보내준다
          res.json(allFeeds)
        }
      })
  }

}