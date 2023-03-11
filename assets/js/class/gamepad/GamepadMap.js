class GamepadMap {

    gamepad;

    buttonMapping

    axesMapping

    constructor(gamepad) {
        this.gamepad = gamepad;
        console.log(this);
        let maxButtons = Math.min(gamepad.buttons.length, 16);
        this.buttonMapping = [];
        for (let i = 0; i < maxButtons; i++) {
            this.buttonMapping.push(i);
        }
        let maxAxes = Math.min(gamepad.axes.length, 4);
        this.axesMapping = [];
        for (let i = 0; i < maxAxes; i++) {
            this.axesMapping.push(i);
        }
        if (this.gamepad.mapping !== "standard") {
            this.remapButtons();
        }
    }

    remapButtons() {
        if (this.gamepad.axes.length === 6 && this.gamepad.buttons.length === 12) {
            // USB Gamepad (Vendor: 0810 Product: 0001) Ubuntu 22.04/chrome
            // Twin USB Joystick (Vendor: 0810 Product: 0001) Ubuntu 22.04/chrome
            this.buttonMapping = [2, 1, 3, 0, 4, 5, 6, 7, 8, 9, 10, 11,
                new SimpleAxisToBtn(5, -1.0), // btn12
                new SimpleAxisToBtn(5, 1), // btn13
                new SimpleAxisToBtn(4, -1), // btn14
                new SimpleAxisToBtn(4, 1) // btn15
            ]
            this.axesMapping = [0, 1, 3, 2];
        }
        if (this.gamepad.axes.length === 10 && this.gamepad.buttons.length === 15) {
            // Unknown Gamepad (Vendor: 1949 Product: 0402) Windows 10/chrome
            // Bluetooth Gamepad (Vendor: 1949 Product: 0402) Windows 10/chrome
            let step = 0.285714149475098;
            this.buttonMapping = [0, 1, 3, 4, 6, 7, 8, 9, 10, 11, 13, 14,
                new AxisToBtn(9, step, -1), // btn12
                new AxisToBtn(9, step, 0.14286), // btn13
                new AxisToBtn(9, step, 0.71429), // btn14
                new AxisToBtn(9, step, -0.42857) // btn15
            ];
            this.axesMapping = [0, 1, 2, 5];
        }
        if (this.gamepad.axes.length === 8 && this.gamepad.buttons.length === 15) {
            // Gamepad (Vendor: 1949 Product: 0402) Ubuntu 22.04/chrome
            // KAP-G7 (Vendor: 1949 Product: 0402) Ubuntu 22.04/chrome
            this.buttonMapping = [0, 1, 3, 4, 6, 7, 8, 9, 10, 11, 13, 14,
                new SimpleAxisToBtn(7, -1.0), // btn12
                new SimpleAxisToBtn(7, 1), // btn13
                new SimpleAxisToBtn(6, -1), // btn14
                new SimpleAxisToBtn(6, 1) // btn15
            ];
            this.axesMapping = [0, 1, 2, 3];
        }
        if (this.gamepad.axes.length === 10 && this.gamepad.buttons.length === 12) {
            // USB Gamepad (Vendor: 0810 Product: 0001) Windows 10/chrome
            let step = 0.285714149475098;
            this.buttonMapping = [2, 1, 3, 0, 4, 5, 6, 7, 8, 9, 10, 11,
                new AxisToBtn(9, step, -1), // btn12
                new AxisToBtn(9, step, 0.14286), // btn13
                new AxisToBtn(9, step, 0.71429), // btn14
                new AxisToBtn(9, step, -0.42857) // btn15
            ]
            this.axesMapping = [0, 1, 5, 2];
        }
        if (this.gamepad.axes.length === 2 && this.gamepad.buttons.length === 10) {
            // USB gamepad (Vendor: 081f Product: e401) Windows 10/chrome, Ubuntu 22.04/chrome
            this.buttonMapping = [2, 1, 3, 0, 4, 5, 6, 7, 8, 9,
                new FakeBtn(),
                new FakeBtn(),
                new SimpleAxisToBtn(1, -1.0), // btn12
                new SimpleAxisToBtn(1, 1), // btn13
                new SimpleAxisToBtn(0, -1), // btn14
                new SimpleAxisToBtn(0, 1)// btn15
            ];
            this.axesMapping = []
        }

    }

}
