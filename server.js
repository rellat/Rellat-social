#!/usr/bin/env node
var debug = require('debug')('Rellat:server')

var app = require('./webserver/app')
var http = require('http')

var serverconfig
try {
  serverconfig = require('./config')
} catch (e) { serverconfig = { hostname: '127.0.0.1', port: process.env.PORT || 3000 } }
var port = serverconfig.port
app.set('port', port)

// Create HTTP server.
var server = http.createServer(app)
// Listen on provided port, on all network interfaces.
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

// Event listener for HTTP server "error" event.
function onError (error) {
  if (error.syscall !== 'listen') { throw error }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

// Event listener for HTTP server "listening" event.
function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}

// DB setting
var mongoose = require('mongoose')
var db = mongoose.connection
mongoose.connect('mongodb://127.0.0.1/rellatlogin')
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  debug('Connected to mongod server')
  mongoose.Promise = global.Promise
})

// Socket.io server setting
var SocketServer = require('./chatserver')
SocketServer(server)
