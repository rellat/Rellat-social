/**
 * client Routing
 */
var path = window.location.pathname
var tp = path.split('/')
if (tp[tp.length - 1] === '') tp.pop()
path = tp.join('/')
switch (path) {
  case '':
  case '/':
    require('./login/loginHome')
    break
  case '/RellatSNS':
    require('./rellatSNS/snsHome')
    break
  case '/RellatChat':
    require('./rellatChat/chatHome')
    break
}
