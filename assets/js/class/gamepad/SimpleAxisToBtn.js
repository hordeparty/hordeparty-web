class SimpleAxisToBtn {
    pressed = false;

    touched = false;

    value = 0;
    axisIdx = 0;

    trigValue = 0;

    constructor(axisIdx, trigValue) {
        this.axisIdx = axisIdx;
        this.trigValue = trigValue;
    }

    trigger(axisValue) {
        if (axisValue === this.trigValue) {
            this.pressed = true;
            this.touched = true;
        } else {
            this.pressed = false;
            this.touched = false;
        }
    }
}