import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client</h1>

    <input type="text" id="jwt-token" placeholder="Json Web Token" />
    <button id="btn-connect">Connect</button>

    <br />

    <span id="server-status">Offline</span>

    <br />
    <br />

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input type="text" id="message-input" placeholder="message" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!

btnConnect.addEventListener('click', () => {
  if (jwtToken.value.trim().length <= 0) return alert('Invalid token')

  connectToServer(jwtToken.value.trim())
})
