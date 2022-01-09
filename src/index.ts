import dotenv from 'dotenv'
dotenv.config({
  path: '.env',
})
import Debug from 'debug'
const debug = Debug('express-ts-fullstack-template:server')
import http from 'http'

import app from './app'

/**
 * Get port from environment and store in Express.
 */

const port = Number(process.env.PORT || '4000')
app.set('port', port)

/**
 * Create HTTP/HTTPS server.
 */

// if (process.env.NODE_ENV === "development") {
const server = http.createServer(app)
// } else if (process.env.NODE_ENV === "production") {
//   var privateKey = fs.readFileSync(process.env.SSL_PRIVATE_KEY, "utf-8");
//   var certificate = fs.readFileSync(process.env.SSL_CERTIFICATE, "utf-8");
//   var credentials = { key: privateKey, cert: certificate };
//   var server = https.createServer(credentials, app);
// }

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  // var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  if (typeof addr !== 'string')
    debug('Listening on http://localhost:' + addr?.port)
}
