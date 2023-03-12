class GamepadHandler {

    controllers = new Map();

    controllerEnabledIdx;

    wrtcData = new Map();

    gamepadMap = new Map();

    sendWrtcData(wrtcData) {
        //
    }

    constructor() {
        window.addEventListener('gamepadconnected', (e) => {
            this.connectListener(e);
        });
        window.addEventListener('gamepaddisconnected', (e) => {
            this.disconnectListener(e);
        });
        window.requestAnimationFrame(() => {
            this.frame();
        });
    }

    connectListener(e) {
        this.addController(e.gamepad.index, navigator.getGamepads()[e.gamepad.index])
    }

    disconnectListener(e) {
        this.controllers.delete(e.gamepad.index);
        this.wrtcData.delete(e.gamepad.index);
        this.gamepadMap.delete(e.gamepad.index);
    }

    addController(idx, gamepad) {
        this.controllers.set(idx, gamepad);
        let wrtcData = new Uint8Array(8);
        wrtcData[0] = 0xB0;
        wrtcData[3] = 0x80;
        wrtcData[4] = 0x80;
        wrtcData[5] = 0x80;
        wrtcData[6] = 0x80;
        wrtcData[7] = 0xBF;
        this.wrtcData.set(idx, wrtcData);
        this.gamepadMap.set(idx, new GamepadMap(gamepad));
    }

    handleController(controller, wrtcData, gamepadMap) {
        let axes = controller.axes;
        for (let index = 0; index < gamepadMap.axesMapping.length; index++) {
            let axisIndex = gamepadMap.axesMapping[index]
            let axis = axes[axisIndex];
            wrtcData[index + 3] = Math.round((1 + axis) * 127.5);
        }
        let buttons = controller.buttons;
        for (let index = 0; index < gamepadMap.buttonMapping.length; index++) {
            let btnIndex = gamepadMap.buttonMapping[index];
            let button;
            if (typeof (btnIndex) === 'number') {
                button = buttons[btnIndex];
            } else if (typeof (btnIndex) === 'object') {
                btnIndex.trigger(axes[btnIndex.axisIdx])
                button = btnIndex;
            }
            let btnValue = 1 << index;
            let btnBitPart1 = (btnValue >> 8) & 0xff;
            let btnBitPart2 = btnValue & 0xff;
            if (button.pressed || button.touched) {
                wrtcData[1] = wrtcData[1] | btnBitPart1;
                wrtcData[2] = wrtcData[2] | btnBitPart2;
            } else {
                wrtcData[1] = wrtcData[1] & (btnBitPart1 ^ 0xff);
                wrtcData[2] = wrtcData[2] & (btnBitPart2 ^ 0xff);
            }
        }
        this.sendWrtcData(wrtcData);
    }

    frame() {
        if (this.controllers.size > 0 && typeof this.controllerEnabledIdx !== 'undefined') {
            if (this.controllerEnabledIdx < 4) {
                this.controllers.set(this.controllerEnabledIdx, navigator.getGamepads()[this.controllerEnabledIdx]);
            }
            this.handleController(
                this.controllers.get(this.controllerEnabledIdx),
                this.wrtcData.get(this.controllerEnabledIdx),
                this.gamepadMap.get(this.controllerEnabledIdx)
            );
        }
        window.requestAnimationFrame(() => {
            this.frame()
        });
    }

}
