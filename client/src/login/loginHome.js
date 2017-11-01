var SiteHeader = require('./siteHeader')
var loginHeader = new SiteHeader({ loginCheck: pageInit })
var template = require('../templates')
var mustache = require('mustache')

function pageInit (isLogedIn) {
  if (isLogedIn) {
    // document.getElementById('content-body').innerHTML = 'You loged in.<br>' + mustache.render(template['intro'])
    window.location.href = window.location.protocol + '//' + window.location.host + '/feed'
  } else {
    // document.getElementById('content-body').innerHTML = 'not loged in' + mustache.render(template['intro'])
    // window.location.href
  }
}
