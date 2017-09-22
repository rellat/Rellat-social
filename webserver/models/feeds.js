var mongoose = require('mongoose');

module.exports = mongoose.model('Feed', {
  user: String,
  userEmail: String,
  userImage: String,
  content: String,
  date: {type: Date, default: Date.now}
})