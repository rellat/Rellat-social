var Reply = require('./../models/reply')

module.exports.addReply = function (req, res) {
  var feedId = req.body.feedId
  var profile = req.body.profile
  //var parentReplyId = req.body.parent ? req.body.parent : null

  var reply = new Reply({
    writerId: profile.email,
    writerImgSrc: profile.picture,
    content: req.body.content,
    feedId: feedId,
    insertTime: String(new Date())
  })

  reply.save().then(function () {
    res.redirect('/api/v1/replies/' + feedId)
  })
}

// 이 함수는 addReply 후 redirecting 되거나 처음 exFeed 생성시 replies를 받는 역할을 할 수도 있다
module.exports.getRepliesInFeed = function (req, res) {
  Reply.find({feedId: req.params.id})
    .sort({insertTime: -1})
    .exec(function (err, replies) {
      if (err) {
        res.error(err)
      } else {
        res.json({
          replies: replies
        })
      }
    })
    .catch(function (err) {
      res.error(err)
    })
}