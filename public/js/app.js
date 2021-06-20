const img = document.querySelector('img')
const mpu = document.getElementById('mpu')
const forward = document.getElementById('forward')
const backward = document.getElementById('backward')
const left = document.getElementById('left')
const right = document.getElementById('right')
const flashlight = document.getElementById('flashlight')
const speed = document.getElementById('speed')

const SOCKET_URL = 'ws://vroom-backend.herokuapp.com/'
const WS_URL = 'ws://vroom-backend.herokuapp.com:1337/'

const ws = new WebSocket(WS_URL)

const socket = io.connect(SOCKET_URL)
let urlObject

document.onkeydown = (e) => {
  const keyCode = e.keyCode
  switch (keyCode) {
    case 90 || 38:
      moveForward()
      break
    case 83 || 40:
      moveBackward()
      break
    case 81 || 37:
      turnLeft()
      break
    case 68 || 39:
      turnRight()
      break
    case 70:
      toggleFlashlight()
      break
    default:
      break
  }
}

speed.onchange = () => {
  socket.emit('emit_command', speed.value)
}
const toggleFlashlight = () => {
  socket.emit('emit_command', 'flashlight')
}
const moveForward = () => {
  socket.emit('emit_command', 'forward')
}
const moveBackward = () => {
  socket.emit('emit_command', 'backward')
}
const turnRight = () => {
  socket.emit('emit_command', 'turnRight')
}
const turnLeft = () => {
  socket.emit('emit_command', 'turnLeft')
}

socket.on('rover_measure', (data) => {
  mpu.innerHTML = data
})
socket.on('stream', (data) => {
  const arrayBuffer = data
  if (urlObject) {
    URL.revokeObjectURL(urlObject)
  }
  urlObject = URL.createObjectURL(new Blob([arrayBuffer]))
  img.src = urlObject
})