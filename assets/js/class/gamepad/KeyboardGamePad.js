class KeyboardGamePad {

    gamepad;

    btnKeys = [
        "KeyJ", // btn 0
        "KeyK", // btn 1
        "KeyU", // btn 2
        "KeyI", // btn 3
        "KeyW", // btn 4
        "KeyO", // btn 5
        "KeyQ", // btn 6
        "KeyP", // btn 7
        "KeyF", // btn 8
        "KeyV", // btn 9
        "KeyA", // btn 10
        "KeyG", // btn 11
        "ArrowUp", // btn 12
        "ArrowDown",  // btn 13
        "ArrowLeft",  // btn 14
        "ArrowRight" // btn 15
    ];

    pressBtn(eventCode, state) {
        let btnIdx = this.btnKeys.indexOf(eventCode);
        if (btnIdx > -1) {
            this.gamepad.buttons[btnIdx].pressed = state;
        }
    }

    constructor(gamepad) {
        this.gamepad = gamepad
        document.addEventListener('keydown', (event) => {
            this.pressBtn(event.code, true);
        });
        document.addEventListener('keyup', (event) => {
            this.pressBtn(event.code, false);
        });
    }

}
