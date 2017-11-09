var request = require('request')
var _ = require('underscore')

var profileManager = require('./../login/profileManager')

function FeedActionManager () {
  var self = this
  self.loginHost = window.location.protocol + '//' + window.location.host // default host setting

}

FeedActionManager.prototype.pressHeart = function (button, feedId) {
  var self = this

  // like가 이미 있는데 누르면 unlike, 없는데 누르면 like
  var isLike = !button.classList.contains('like')

  var token = profileManager.getToken()
  var profile = profileManager.getProfile()

  var options = {
    method: 'POST',
    url: self.loginHost + '/api/v1/pressHeart',
    headers:
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'x-access-token': token,
        'x-key': profile.email
      },
    body: {
      'feedId': feedId,
      'isLike': isLike,
      'profile': profile
    },
    json: true
  }
  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    // callback으로 모든 feed가 들어온다
    // 후처리는 클라이언트에서 한다
    console.log(body.state)

    if (!body.state){
      console.log(body.message)
      return
    }
    // 색만 바뀌는거니까 reflow는 안일어나고 repaint만 일어나지 않을까
    if (isLike) button.classList.add('like')
    else button.classList.remove('like')
  })
}

FeedActionManager.prototype.setHeartAction = function (element, likeList, feedId) {
  var self = this
  var email = profileManager.getProfile().email

  if (_.findIndex(likeList, {userEmail: email}) !== -1) {
    element.classList.add('like')
  }

  element.addEventListener('click', function (e) {
    self.pressHeart(element, feedId)
  })
}


module.exports = new FeedActionManager()