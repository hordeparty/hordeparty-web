let gamePadHandler = new GamepadHandler();

function debugSend() {
    gamePadHandler.sendWrtcData = function (wrtcData) {
        if (spclient != null && spclient.simplePeer != null) {
            spclient.simplePeer.send(wrtcData);
        }
    };
}
