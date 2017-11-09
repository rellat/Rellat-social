var profileManager = require('./../login/profileManager')
var request = require('request')
var mustache = require('mustache')
var template = require('./../templates')

var util = require('./../util')

function ReplyManager () {
  var self = this
  self.timeTick = -1
  self.loginHost = window.location.protocol + '//' + window.location.host
}

ReplyManager.prototype.setReplyInput = function () {
  var self = this
  var replyInput = document.getElementsByClassName('sns-reply-textarea')[0]
  replyInput.addEventListener('keydown', function (event) {
    if ((event.keyCode === 13 || event.which === 13) && !event.shiftKey) { // event.keyCode == 13 은 enter 키이다. event.which는 브라우져 호환성을 위해 삽입했다.
      event.preventDefault()
      self.postReply(replyInput.value, replyInput.id)
      replyInput.value = ''
    }
  })
}

ReplyManager.prototype.setReplies = function (replies) {
  var self = this

  var replyContainer = document.getElementsByClassName('sns-reply-container')[0]
  replyContainer.innerHTML = mustache.render(template['reply'], {'replies': replies})

  self.resetReplyTimeTick(replies)
}

ReplyManager.prototype.postReply = function (content,feedId) {
  var self = this

  var token = profileManager.getToken()
  var profile = profileManager.getProfile()

  options = {
    method: 'POST',
    url: self.loginHost + '/api/v1/addReply',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-access-token': token,
        'x-key': profile.email
      },
    body: {
      "content" : content,
      "profile": profile,
      "feedId": feedId
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    // callback으로 모든 feed가 들어온다
    // 후처리는 클라이언트에서 한다
    self.setReplies(body.replies)
  })
}
// feedManager와 아주 유사함
ReplyManager.prototype.resetReplyTimeTick = function (replies) {
  var self = this

  // 시간 갱신을 위해 등록
  self.updateReplyTime(replies)
  self.clearTimeTick()
  self.timeTick = setInterval(function () { self.updateReplyTime(replies) }, 1000 * 10)
}

ReplyManager.prototype.updateReplyTime = function (replies) {
  var self = this

  for(var i =0, len = replies.length; i< len; i++){
    var reply = replies[i]
    var replyTime = document.getElementById('sns-reply-time-' + reply._id)
    if (!replyTime) return
    replyTime.innerHTML = util.getTimeDifference(new Date(), new Date(reply.insertTime))
  }
}

ReplyManager.prototype.clearTimeTick = function () {
  var self = this
  window.clearInterval(self.timeTick)
  self.timeTick = -1
}

module.exports = new ReplyManager()