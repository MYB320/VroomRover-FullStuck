const socketIO = (server, wss, option) => {
  const io = require('socket.io')(server, option)
  const WebSocket = require('ws')

  io.on('connection', (socket) => {
    console.log(`made socket connection with id: ${socket.id}`)

    socket.on('detectObj', (raw) => {
      const data = JSON.stringify(raw)
      console.log(data)
      // socket.broadcast.emit('sensor', data)
    })
    socket.on('emit_command', (raw) => {
      socket.broadcast.emit('command_rover', raw)
      console.log(raw)
    })

    wss.on('connection', (ws) => {
      ws.on('message', (data) => {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data)
          }
        })
      })
    })
  })
}
module.exports = socketIO
