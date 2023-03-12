class KeyboardGamepad {

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

    axesKeys = {
        KeyZ: new SimpleAxisToBtn(0, -1),
        KeyC: new SimpleAxisToBtn(0, 1),
        KeyS: new SimpleAxisToBtn(1, -1),
        KeyX: new SimpleAxisToBtn(1, 1),
        KeyB: new SimpleAxisToBtn(2, -1),
        KeyM: new SimpleAxisToBtn(2, 1),
        KeyH: new SimpleAxisToBtn(3, -1),
        KeyN: new SimpleAxisToBtn(3, 1)
    }

    pressBtn(eventCode, state) {
        let btnIdx = this.btnKeys.indexOf(eventCode);
        if (btnIdx > -1) {
            this.gamepad.buttons[btnIdx].pressed = state;
        }
    }

    moveAxis(eventCode, state) {
        if (this.axesKeys[eventCode]) {
            let axesKey = this.axesKeys[eventCode];
            if (state) {
                this.gamepad.axes[axesKey.axisIdx] = axesKey.trigValue;
            } else {
                this.gamepad.axes[axesKey.axisIdx] = 0;
            }
        }
    }

    constructor(gamepad) {
        this.gamepad = gamepad
        document.addEventListener('keydown', (event) => {
            this.pressBtn(event.code, true);
            this.moveAxis(event.code, true);
        });
        document.addEventListener('keyup', (event) => {
            this.pressBtn(event.code, false);
            this.moveAxis(event.code, false);
        });
    }

}
