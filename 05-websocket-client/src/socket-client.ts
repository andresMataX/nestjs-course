import { Manager, Socket } from 'socket.io-client'

export const connectToServer = () => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js')

  const socket = manager.socket('/')

  addListenters(socket)
}

const addListenters = (socket: Socket) => {
  const serverStatusLabel =
    document.querySelector<HTMLSpanElement>('#server-status')!

  socket.on('connect', () => {
    serverStatusLabel.innerText = 'Online'
  })

  socket.on('disconnect', () => {
    serverStatusLabel.innerText = 'Offline'
  })
}
