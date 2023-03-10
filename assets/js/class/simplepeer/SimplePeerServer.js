class SimplePeerServer {

    socket;

    clients = new Map();

    room;

    constructor(wsUrl, room) {
        this.socket = io(wsUrl);
        this.socket.emit('joinRoom', room);
        this.clientHelloHandler();
        this.clientAnswerHandler();
        this.clientChangePlayerNameHandler();
    }

    clientHelloHandler() {
        this.socket.on('clientHello', msgHelloIn => {
            let msgIn = msgHelloIn;
            let controller = this.clients.size + 1;
            let streamTypeArray = msgIn.msg.split(':');
            let simplePeer;
            if (streamTypeArray.length === 2 && streamTypeArray[1] === "nothing") {
                console.log("no stream");
                simplePeer = new SimplePeer({
                    initiator: true,
                    trickle: false
                });
            } else {
                simplePeer = new SimplePeer({
                    initiator: true,
                    stream: this.getStreamVideo(msgIn.msg),
                    trickle: false
                });
            }
            simplePeer.on('signal', (data) => {
                this.socket.emit('serverOffer', msgIn.from, data);
            });
            let client = new ClientHandler(msgIn.msg, controller, simplePeer);
            client.processData = this.serverProcessData;
            let playerName = client.name;
            this.clients.set(msgIn.from, client);
            this.addClientToTable(msgIn.from, playerName, controller);
        });
    }

    clientAnswerHandler() {
        this.socket.on('clientAnswer', msgAnswerIn => {
            let msgIn = msgAnswerIn;
            let client = this.clients.get(msgIn.from);
            client.simplePeer.signal(msgIn.msg);
            client.online = true;
            $(`#tr${msgIn.from}`).children().get(2).innerHTML = "<b>ONLINE</b>";
            $('#connect-serial-btn').removeAttr("disabled");
            $('#validate-controllers-btn').removeAttr("disabled");
        });
    }

    clientChangePlayerNameHandler() {
        this.socket.on('changePlayerName', msgPlayerNameIn => {
            let msgIn = msgPlayerNameIn;
            $(`#${msgIn.from}`).parent().prev().html(msgIn.msg)
        });
    }

    getStreamVideo(streamType) {
        let canvasStream = document.getElementById('canvas-stream').captureStream();
        let audioStream = document.getElementById('aud').captureStream();
        let streamTypeArray = streamType.split(':')
        if (streamTypeArray.length === 2) {
            let videoStream = document.getElementById('vid').captureStream();
            if (streamTypeArray[1] === "canvas") {
                console.log("canvas stream");
                return canvasStream;
            } else if (streamTypeArray[1] === "video") {
                console.log("video stream");
                return videoStream;
            } else if (streamTypeArray[1] === "audio") {
                console.log("audio stream");
                return audioStream;
            }
        } else {
            if (audioStream.getAudioTracks()[0]) {
                canvasStream.addTrack(audioStream.getAudioTracks()[0]);
            }
            return canvasStream;
        }
    }

    ready() {
        this.socket.emit('serverReady', true);
    }

    addClientToTable(socketId, playerName, controller) {
        $("#tbodyJogadores").append(`<tr id="tr${socketId}">
<td>${playerName}</td>
<td><select id="${socketId}" value="${controller}" onchange="changeController($(this));">
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
</select></td>
<td>OFFLINE</td>
<td id="${socketId}Hex"></td>
</tr>`);
        $(`#${socketId}`).val(controller);
    }

    changeController(controllerSelect) {
        this.clients.get(controllerSelect.attr('id')).controller = controllerSelect.val();
    }

    serverProcessData(data) {
        // console.log(data);
        // gamepadCanvas.processInput(data);
        // serialObj.sendUint8Array(data);
    }

}
