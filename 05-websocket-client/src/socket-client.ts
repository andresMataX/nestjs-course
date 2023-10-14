import { Manager, Socket } from 'socket.io-client'

let socket: Socket

export const connectToServer = (token: string) => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
    extraHeaders: {
      authorization: token,
    },
  })

  socket?.removeAllListeners()
  socket = manager.socket('/')

  addListenters()
}

const addListenters = () => {
  const serverStatusLabel =
    document.querySelector<HTMLSpanElement>('#server-status')!

  const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!
  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!

  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
  const messageInput =
    document.querySelector<HTMLInputElement>('#message-input')!

  socket.on('connect', () => {
    serverStatusLabel.innerText = 'Online'
  })

  socket.on('clients-updated', (clients: string[]) => {
    clientsUl.innerHTML = ''

    clients.forEach((client) => {
      const li = document.createElement('li')

      li.innerText = client

      clientsUl.appendChild(li)
    })
  })

  socket.on('disconnect', () => {
    serverStatusLabel.innerText = 'Offline'
  })

  messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (messageInput.value.trim().length <= 0) return

    const message = messageInput.value

    socket.emit('message-from-client', { id: 'Yop', message })

    messageInput.value = ''
  })

  socket.on(
    'message-from-server',
    (payload: { fullName: string; message: string }) => {
      const newMessage = `
        <li>
          <strong>${payload.fullName}</strong>: ${payload.message}
        </li>
      `

      const li = document.createElement('li')
      li.innerHTML = newMessage
      messagesUl.appendChild(li)
    }
  )
}
