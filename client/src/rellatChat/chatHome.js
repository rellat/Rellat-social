var ChatApp = require('./chat')
var SiteHeader = require('../login/siteHeader')
var loginHeader = new SiteHeader({ loginCheck: pageInit })
var template = require('../templates')
var mustache = require('mustache')

function pageInit (isLogedIn) {
  if (isLogedIn) {
    document.getElementById('content-body').innerHTML = mustache.render(template['chat'])

    var roomSectionElement = document.getElementById('room-section')
    var chatSectionElement = document.getElementById('chat-section')

    window.chatapp = new ChatApp(roomSectionElement, chatSectionElement)
  } else {
    window.location.href = '/'
  }
}
