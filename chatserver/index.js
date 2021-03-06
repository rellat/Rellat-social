var socketio = require('socket.io')
// var User = require('../webserver/models/User')
// var RoomManager = require('./roommanager')

var socketioAuth = require('socketio-auth')
var authconfig = require('./socketauth')

var Room = require('../webserver/models/roommodel')

module.exports = function (server) {
  var io = socketio.listen(server)
  socketioAuth(io, {
    authenticate: authconfig.authenticate,
    postAuthenticate: authconfig.postAuthenticate,
    disconnect: authconfig.disconnect,
    timeout: 5000
  })

  // Rooms namespace
  io.on('connection', function (socket) {
    // Create a new room
    socket.on('createRoom', function (title) {
      Room.findOne({'title': new RegExp('^' + title + '$', 'i')}, function (err, room) {
        if (err) throw err
        if (room) {
          socket.emit('updateRoomsList', { error: 'Room title already exists.' })
        } else {
          Room.create({
            title: title,
            ownerId: socket.client.profile.userId,
            permission: 'public'
          }, function (err, newRoom) {
            if (err) throw err
            socket.emit('updateRoomsList', newRoom)
            socket.broadcast.emit('updateRoomsList', newRoom)
          })
        }
      })
    })

    // Join a chatroom
    socket.on('join', function (roomId) {
      Room.findById(roomId, function (err, room) {
        if (err) throw err
        if (!room) {
          // Assuming that you already checked in router that chatroom exists
          // Then, if a room doesn't exist here, return an error to inform the client-side.
          socket.emit('updateUsersList', { error: 'Room doesnt exist.' })
        } else {
          Room.addUser(room, socket, function (err, newRoom) {
            if (err) throw err

            // Join the room channel
            socket.join(newRoom._id)

            Room.getUsers(newRoom, function (err, users) {
              if (err) throw err
              // Return list of all user connected to the room to the current user
              socket.emit('updateUsersList', users, true)
              socket.broadcast.to(room.id).emit('updateUsersList', users, true)
            })
          })
        }
      })
    })

    function leaveRoom () {
      // Find the room to which the socket is connected to,
      // and remove the current user + socket from this room

      Room.removeUser(socket, io.sockets.connected, function (err, room, userId) {
        if (err) throw err
        // Leave the room channel
        socket.leave(room.id)
        // socket.broadcast.to(room.id).emit('removeUser', userId)
        Room.getUsers(room, function (err, users) {
          if (err) throw err
          // Return list of all user connected to the room to the current user
          socket.broadcast.to(room.id).emit('updateUsersList', users, true)
        })
      })
    }

    socket.on('leaveRoom', leaveRoom)
    // When a socket exits
    socket.on('disconnect', leaveRoom)

    // When a new message arrives
    socket.on('newMessage', function (roomId, message) {
      // No need to emit 'addMessage' to the current socket
      // As the new message will be added manually in 'main.js' file
      // socket.emit('addMessage', message);
      console.log('message ' + JSON.stringify(message))
      socket.broadcast.to(roomId).emit('addMessage', message)
    })
  })
}

/**
 * Subscription모드로 바꾸기
 * 소켓 연결이 끊어져도 대화내용을 저장
 * 사용자가 '나가기'를 실행하기 전에는 소켓 연결이 끊겨도 사용자가 채팅룸에 오프라인으로 남아있도록 만들기
 */
