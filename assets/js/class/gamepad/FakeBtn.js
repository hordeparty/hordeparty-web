class FakeBtn {
    pressed = false;

    touched = false;

    trigger(axisValue) {
        this.pressed = false;
        this.touched = false;
    }

}
