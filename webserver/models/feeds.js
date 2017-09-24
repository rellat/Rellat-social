var mongoose = require('mongoose');

module.exports = mongoose.model('Feed', {
  user: String,
  userEmail: String,
  userImage: String,
  contentTitle: String,
  contentBody: String,
  date: {type: Date, default: Date.now}
})