class SimplePeerClient {

    socket;

    simplePeer;

    room;

    constructor(wsUrl, room) {
        this.room = room;
        this.socket = io(wsUrl);
        this.createRoomHandler();
        if (this.room) {
            $('#room').val(this.room);
            this.joinRoom();
        }
        this.serverOfferHandler();
        this.serverReadyHandler();
    }

    connect() {
        let playerName = document.getElementById("playerName").value;
        this.socket.emit('clientHello', playerName);
        $("#connectBtn").attr('disabled', 'disabled');
    }

    changePlayerName() {
        this.socket.emit('changePlayerName', $('#playerName').val());
    }

    serverOfferHandler() {
        this.socket.on('serverOffer', packet => {
            if (this.simplePeer == null) {
                this.simplePeer = new SimplePeer({
                    initiator: false,
                    trickle: false
                });
                this.simplePeer.on('error', err => console.log(err));
                this.simplePeer.on('signal', (data) => {
                    this.socket.emit('clientAnswer', data);
                });
                this.simplePeer.on('stream', stream => {
                    let receiverVideo = document.getElementById("receiver-video");
                    receiverVideo.srcObject = stream;
                });
            }
            this.simplePeer.signal(packet);
        });
    }


    serverReadyHandler() {
        this.socket.on('serverReady', isServeReady => {
            if (isServeReady && this.simplePeer === null) {
                $('#connectBtn').removeAttr('disabled').html('GO GO GO! Connect!');
                $('#createServerBtn').css({display: 'none'});
            } else if (this.simplePeer !== null) {
                this.connect();
                $('#connectBtn').attr('disabled', 'disabled').html('Connected');
                $('#gamepadSelect').removeAttr('disabled');
            } else {
                $('#connectBtn').attr('disabled', 'disabled').html('Waiting server...');
            }
        });
    }

    createRoomHandler() {
        this.socket.on('createRoom', room => {
            $('#room').val(room);
            this.roomOk();
        });
    }

    joinRoom() {
        if (this.room) {
            this.socket.emit('joinRoom', this.room);
            this.roomOk();
        } else {
            this.socket.emit('createRoom');
        }
    }

    roomOk() {
        if (!this.room) {
            $('#createServerBtn').css({display: 'block'});
        }
        $('#room').attr('disabled', 'disabled');
        $('#joinRoomBtn').attr('disabled', 'disabled');
    }

}
