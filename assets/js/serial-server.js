let gamepadCanvas;

function startAnimating(fps) {
    if (!gamepadCanvas) {
        let gamepadCanvasConfig = new GamepadCanvasConfig();
        gamepadCanvasConfig.fps = fps;
        gamepadCanvas = new GamepadCanvas(gamepadCanvasConfig);
        spserver.clients.forEach(function (client) {
            client.processData = function (data) {
                gamepadCanvas.processInput(data);
            }
        });
    } else {
        gamepadCanvas.runAnimate = !gamepadCanvas.runAnimate;
    }
}

let byteArray = [0xB0, 0x00, 0x05, 0x80, 0x80, 0x80, 0x80, 0xBF]

function processInput() {
    gamepadCanvas.processInput(byteArray);
}

let serialObj = new Serial();
let serialReaderDebug = new SerialReaderDebug();
serialObj.handleSerialDataCallBack = data => {
    serialReaderDebug.handle(data);
}

async function connectSerial() {
    await serialObj.connect(true).then(function () {

        spserver.clients.forEach(function (client, key) {
            client.processData = function (data) {
                let dataStr = '';
                for (let i = 0; i < data.length; i++) {
                    dataStr = dataStr + ' 0x' + parseInt(data[i]).toString(16).padStart(2, '0').toUpperCase();
                }
                $('#' + key + 'Hex').text(`(${data.length}) ${dataStr}`);
                serialObj.sendUint8Array(data);
            }
        });
    });
}

function sendExample() {
    let serialDataExample = [0xB0, 0x01, 0x02, 0xB0, 0x04, 0x05, 0x06, 0xBF];
    serialObj.send(serialDataExample);
}


let cameraOptions;
let micOptions;

let usermediaHandler = new UserMediaHandler();

let room = new URL(window.location.href).searchParams.get('room');
if (!room) {
    room = "123";
}
let spserver = new SimplePeerServer("wss://hordeparty.ddns.net:3000/servers", room);

const changeController = (controllerSelect) => {
    spserver.changeController(controllerSelect);
}

const broadcastServerReady = () => {
    spserver.ready();
}
