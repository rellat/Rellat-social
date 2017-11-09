var Mongoose = require('mongoose')

var ReplySchema = new Mongoose.Schema({
  writerId: { type: String, default: null },
  writerImgSrc: { type: String, default: null },
  permission: { type: String, default: null },
  insertTime: { type: String },
  content: { type: String },
  feedId: { type: String, default: null },
  parentReplyId: { type: String, default: null },
  subReplies: [{ replyId: String }]
})

/*return promise*/
ReplySchema.statics.findReply = function (id) {
  return this.findOne({_id: parentReplyId})
}

/*return promise*/
ReplySchema.statics.addSubReply = function (reply,subReplyId) {
  reply.subReplies.push({replyId:subReplyId})
  return reply.save()
}

module.exports = Mongoose.model('reply', ReplySchema)
