class AxesMark extends BtnMark {

    axisXPos = 0;

    axisYPos = 0;

    directionRadius = 5;

    constructor(x, y, radius, directionRadius) {
        super(x, y, radius);
        this.directionRadius = directionRadius;
    }

    setAxisXPos(axisPos) {
        this.axisXPos = (axisPos - 0x80) / (0x80 / this.radius);
    }

    setAxisYPos(axisPos) {
        this.axisYPos = (axisPos - 0x80) / (0x80 / this.radius);
    }

    getX() {
        return this.x + this.axisXPos;
    }

    getY() {
        return this.y + this.axisYPos;
    }

    getDirectionRadius() {
        return this.directionRadius;
    }
}
