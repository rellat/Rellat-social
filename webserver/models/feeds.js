var mongoose = require('mongoose')
var Schema = mongoose.Schema

var FeedSchema = new Schema({
  user: String,
  userEmail: String,
  userPicture: String,
  contentBody: String,
  insertTime: String,
  likeList: [{userEmail: String}]
})

module.exports = mongoose.model('Feed', FeedSchema)