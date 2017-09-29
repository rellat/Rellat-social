var express = require('express')
var router = express.Router()

var userManager = require('./userManager')
// login
router.post('/user/registerUser', userManager.registerUser)
router.post('/user/login', userManager.login)
router.get('/api/v1/user/profile', userManager.getOneUserData)
// get user data
router.get('/api/v1/user', userManager.getOneUserData)
router.put('/api/v1/userUpdate', userManager.updateUser)
router.delete('/api/v1/userDelete', userManager.deleteUser)

var followManager = require('./followManager')
router.post('/api/v1/follow', followManager.follow)
router.post('/api/v1/unfollow', followManager.unfollow)
router.get('/api/v1/followerList', followManager.getFollowerList)
router.get('/api/v1/followingList', followManager.getFollowingList)

var feedManager = require('./feedManager')
router.post('/api/v1/feed/AllFeeds', feedManager.getAllFeeds)
router.post('/api/v1/feed/postFeed', feedManager.postFeed)

router.get('/api/v1/usersAndFollowings',userManager.getAllUserList, followManager.getFollowerList)


/*
 * Routes for Chat room
 */
var ChatRoute = require('./chat')
router.get('/api/v1/chat/rooms', ChatRoute.getRoomList)

module.exports = router
