var ChatApp = require('./chat')
var profileManager = require('./../login/profilemanager')
var mustache = require('mustache')
var templates = require('./../templates')

console.log("??????????")
document.body.innerHTML = mustache.render(templates['chat'])

var roomSectionElement = document.getElementById('room-section')
var chatSectionElement = document.getElementById('chat-section')

window.chatapp = new ChatApp(roomSectionElement, chatSectionElement)

document.getElementById('logout-btn').addEventListener('click', function (e) {
  profileManager.logout(function () {
    profileManager.goNextPage('/')
  })
  return false
})