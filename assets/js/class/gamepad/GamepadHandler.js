class GamepadHandler {

    controllers = new Map();

    controllerEnabledIdx = 0;

    wrtcData = new Map();

    gamepadMap = new Map();

    sendWrtcData(wrtcData) {
        //
    }

    constructor() {
        window.addEventListener('gamepadconnected', this.connectListener.bind(this));
        window.addEventListener('gamepaddisconnected', this.disconnectListener.bind(this));
        window.requestAnimationFrame(this.frame.bind(this));
    }

    connectListener(e) {
        let gamepad = navigator.getGamepads()[e.gamepad.index];
        this.controllers.set(gamepad.index, gamepad);
        let wrtcData = new Uint8Array(8);
        wrtcData[0] = 0xB0;
        wrtcData[3] = 0x80;
        wrtcData[4] = 0x80;
        wrtcData[5] = 0x80;
        wrtcData[6] = 0x80;
        wrtcData[7] = 0xBF;
        this.wrtcData.set(gamepad.index, wrtcData);
        this.gamepadMap.set(gamepad.index, new GamepadMap(gamepad));
    }

    disconnectListener(e) {
        this.controllers.delete(e.gamepad.index);
        this.wrtcData.delete(e.gamepad.index);
        this.gamepadMap.delete(e.gamepad.index);
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
        if (this.controllers.size > 0) {
            this.controllers.set(this.controllerEnabledIdx, navigator.getGamepads()[this.controllerEnabledIdx]);
            this.handleController(
                this.controllers.get(this.controllerEnabledIdx),
                this.wrtcData.get(this.controllerEnabledIdx),
                this.gamepadMap.get(this.controllerEnabledIdx)
            );
        }
        window.requestAnimationFrame(this.frame.bind(this));
    }

}
