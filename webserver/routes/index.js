var express = require('express')
var router = express.Router()

/*
 * Routes that can be accessed by any one
 */
var userController = require('./user-controller')
router.post('/user/checkExist', userController.checkExist)
router.post('/user/registerUser', userController.registerUser)
router.post('/user/login', userController.login)

/*
 * Routes that can be accessed only by autheticated users
 */
var feedController = require('./feed-controller')
router.get('/api/v1/feed/getFeeds', feedController.getFeeds)
router.post('/api/v1/feed/postFeed', feedController.postFeed)
//router.put('/api/v1/product/:id', products.update)
//router.delete('/api/v1/product/:id', products.delete)

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', userController.getAllUserList)
router.get('/api/v1/admin/user/:email', userController.getOneUserData)
router.put('/api/v1/admin/user/:email', userController.updateUser)
router.delete('/api/v1/admin/user/:email', userController.deleteUser)

var pageController = require('./page-controller')
router.get('/api/v1/admin/page/UsersPage', pageController.getUsersPage)
router.get('/api/v1/admin/page/mainPage', pageController.getMainPage)

module.exports = router
