var mongoose = require('mongoose')

module.exports = mongoose.model('Feed', {
  user: String,
  userEmail: String,
  userPicture: String,
  contentBody: String,
  insertTime: String
})
