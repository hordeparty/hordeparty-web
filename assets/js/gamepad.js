let gamePadHandler = new GamepadHandler();

gamePadHandler.addController(4, new FakeGamepad("Keyboard", "keyboard"));
gamePadHandler.addController(5, new FakeGamepad("Screen", "screen"));

function debugSend() {
    if ($('#gamepadSelect').val() !== '') {
        gamePadHandler.controllerEnabledIdx = parseInt($('#gamepadSelect').val());
    }
    $('#gamepadSelect').children().each((idx, domObj) => {
        $(domObj).val('');
    })
    gamePadHandler.controllers.forEach((a, b) => {
        $($('#gamepadSelect').children()[b + 1]).text(a.id).val(b)
    });
    gamePadHandler.sendWrtcData = function (wrtcData) {
        if (spclient != null && spclient.simplePeer != null) {
            spclient.simplePeer.send(wrtcData);
        }
    };
}
