var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')
var DEFAULT_USER_PICTURE = '/img/user.jpg'
var SALT_WORK_FACTOR = 10

var Schema = mongoose.Schema
var UserSchema = new Schema({
  email: {type: String, required: true},
  userId: {type: String, default: null},
  username: {type: String, default: null},
  password: {type: String, default: null},
  socialId: {type: String, default: null},
  picture: {type: String, default: DEFAULT_USER_PICTURE},
  userRole: {type: String, default: null},
  following: [{userEmail: String}],
  followers: [{userEmail: String}]
})

UserSchema.pre('save', function (next) {
  var user = this
  if (!user.picture) { // ensure user picture is set
    user.picture = DEFAULT_USER_PICTURE
  }
  if (!user.userId) { // make username if it isn't assined
    user.userId = Math.random().toString(36).substr(2)
  }
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err)
      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
  // next()
})

UserSchema.methods.validatePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return callback(err)
    callback(null, isMatch)
  })
  // callback(null, password === this.password)
}

module.exports = mongoose.model('User', UserSchema);

