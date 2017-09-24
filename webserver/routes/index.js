var express = require('express')
var router = express.Router()

var loginRoute = require('./login_route')
router.post('/user/checkExist', loginRoute.checkExist)
router.post('/user/registerUser', loginRoute.registerUser)
router.post('/user/login', loginRoute.login)

var homeRoute = require('./home_route')
router.get('/main', homeRoute.getMainPage)
router.get('/api/v1/feed/getFeeds', homeRoute.getFeeds)
router.post('/api/v1/feed/postFeed', homeRoute.postFeed)

var apiRoute = require('./api_route')
router.get('/api/v1/admin/users', apiRoute.getAllUserList)
router.get('/api/v1/admin/user/:email', apiRoute.getOneUserData)
router.put('/api/v1/admin/user/:email', apiRoute.updateUser)
router.delete('/api/v1/admin/user/:email', apiRoute.deleteUser)

// 지금은 index를 보여주지만 나중에는 home 페이지로 들어가도록 하자
router.get('/', function (req, res) {
  res.render('index', {})
})

module.exports = router
