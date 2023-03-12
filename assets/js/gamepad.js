let gamePadHandler = new GamepadHandler();
let keyGamepad = new FakeGamepad("Keyboard", "keyboard");
let keyboardGamepad = new KeyboardGamepad(keyGamepad);
gamePadHandler.addController(4, keyGamepad);
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
