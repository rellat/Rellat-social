var RoomModel = require('./chatroom')
var User = require('./user')

var create = function (data, callback) {
  var newRoom = new RoomModel(data)
  newRoom.save(callback)
}

var find = function (data, callback) {
  RoomModel.find(data, callback)
}

var findOne = function (data, callback) {
  RoomModel.findOne(data, callback)
}

var findById = function (id, callback) {
  RoomModel.findById(id, callback)
}

// var findByIdAndUpdate = function (id, data, callback) {
//   RoomModel.findByIdAndUpdate(id, data, { new: true }, callback)
// }

/**
* Add a user along with the corresponding socket to the passed room
*
*/
var addUser = function (room, socket, callback) {
  // Get current user's id
  var userId = socket.client.profile.userId
  // console.log('get user id: ' + userId);
  // Push a new connection object(i.e. {userId + socketId})
  room.connections.push({ userId: userId, socketId: socket.id })

  var isexist = room.subscription.findIndex(function (element) {
    return element.userId === userId
  })
  if (isexist === -1) room.subscription.push({ userId: userId })

  room.save(callback)
}

/**
* Get all users in a room
*/
var getUsers = function (room, callback) {
  var users = []

  // Loop on room's connections, Then:
  room.subscription.forEach(function (subs) {
    var tuser = {
      userId: subs.userId,
      online: 'offline',
      picture: '/img/user.jpg',
      username: 'unknown'
    }
    var isexist = room.connections.findIndex(function (conn) {
      return conn.userId === subs.userId
    })
    if (isexist !== -1) { // when subscripted user is online.
      tuser.online = 'online'
    }

    users.push(tuser)
  })

  // Loop on each user id, Then:
  // Get the user object by id, and assign it to users array.
  // So, users array will hold users' objects instead of ids.
  users.forEach(function (tuser, i) {
    User.findOne({userId: tuser.userId}, function (err, user) {
      if (err) { return callback(err) }

      tuser.picture = user.picture
      tuser.username = user.username
      if (i + 1 === users.length) {
        // because findOne is async, so return should place here.
        // console.log('user ' + JSON.stringify(users))
        setTimeout(function () { // sometime last query finished earlier than other one.
          callback(null, users)
        }, 0)
      }
    })
  })
}

/**
* Remove a user along with the corresponding socket from a room
*
*/
var removeUser = function (socket, clients, callback) {
  // Get current user's id
  // console.log(socket.client.profile)
  // console.log('current users' + JSON.stringify())
  var userId = socket.client.profile.userId

  find({}, function (err, rooms) {
    if (err) { return callback(err) }

    // Loop on each room, Then:
    rooms.forEach(function (room, ri) {
      var pass = true
      // For every room,
      // 1. Count the number of connections of the current user(using one or more sockets).
      room.connections.forEach(function (conn, i) {
        if (conn.socketId === socket.id) {
          pass = false
          room.connections.id(room.connections[i]._id).remove()
        } else if (!clients[conn.socketId]) { // delete connection if socket doesn't exist
          pass = false
          room.connections.id(room.connections[i]._id).remove()
        }
      })

      // 2. Check if the current room has the disconnected socket,
      // If so, then, remove the current connection object, and terminate the loop.
      if (!pass) {
        room.save(function (err) {
          callback(err, room, userId)
        })
      }
    })
  })
}

module.exports = {
  create,
  find,
  findOne,
  findById,
  addUser,
  getUsers,
  removeUser
}
