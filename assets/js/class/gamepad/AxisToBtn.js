class AxisToBtn extends SimpleAxisToBtn {

    step = 0;

    /**
     *
     * @param axisIdx
     * @param step
     * @param trigValue must be max 5 dig precision
     */
    constructor(axisIdx, step, trigValue) {
        super(axisIdx, trigValue);
        this.step = step;
    }

    trigger(axisValue) {
        if (axisValue >= -1 && axisValue <= 1) {
            let rangeFrom = Math.trunc((this.trigValue - this.step) * 100000) / 100000;
            let rangeTo = Math.trunc((this.trigValue + this.step) * 100000) / 100000;
            let rangeTmp = 10;
            axisValue = Math.trunc(axisValue * 100000) / 100000;
            if (rangeFrom < -1) {
                rangeTmp = 1;
            }
            if (axisValue === rangeTmp || (axisValue >= rangeFrom && axisValue <= rangeTo)) {
                this.pressed = true;
                this.touched = true;
            } else {
                this.pressed = false;
                this.touched = false;
            }
        } else {
            this.pressed = false;
            this.touched = false;
        }
    }
}
