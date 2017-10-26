/**
 * client Routing
 */
var path = window.location.pathname
var tp = path.split('/')
// if (tp[tp.length - 1] === '') tp.pop()
// path = tp.join('/')
path = tp[1] // 0: '/', check first dir
switch (path) {
  case 'feed':
    require('./rellatSNS/snsHome')
    break
  case 'chat':
    require('./rellatChat/chatHome')
    break
  case '':
  default:
    require('./login/loginHome')
    break
}
