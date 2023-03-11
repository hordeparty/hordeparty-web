let gamePadHandler = new GamepadHandler();

function debugSend() {
    if ($('#gamepadSelect').val() !== '') {
        gamePadHandler.controllerEnabledIdx = parseInt($('#gamepadSelect').val());
    }
    gamePadHandler.controllers.forEach((a, b) => {
        $($('#gamepadSelect').children()[b + 1]).text(a.id)
    })
    gamePadHandler.sendWrtcData = function (wrtcData) {
        if (spclient != null && spclient.simplePeer != null) {
            spclient.simplePeer.send(wrtcData);
        }
    };
}
