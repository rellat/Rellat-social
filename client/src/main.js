

//로그인 하지 않고도 접속자가 접근 할 수 있는 것들이다
var path = window.location.href.toString().replace('http://localhost:3000','')

switch (path){
  case '/':
    require('./login')
    break
  case '/main':
    require('./home')
}