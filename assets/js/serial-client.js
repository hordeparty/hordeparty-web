let room = new URL(window.location.href).searchParams.get('room');

let spclient = new SimplePeerClient("wss://hordeparty.ddns.net/clients", room)

