let room = new URL(window.location.href).searchParams.get('room');

let spclient = new SimplePeerClient("ws://localhost:3000/clients", room)

