class GamepadCanvas {

    runAnimate = true;

    btnMarks = new Map();

    axesMarks = new Map();

    canvas;

    ctx;

    fpsInterval;

    then = Date.now();

    gamepadCanvasConfig;

    constructor(gamepadCanvasConfig) {
        this.gamepadCanvasConfig = gamepadCanvasConfig;
        this.fpsInterval = 1000 / gamepadCanvasConfig.fps;
        this.canvas = gamepadCanvasConfig.domCanvas;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = "bold 30px Arial";
        this.btnMarks = gamepadCanvasConfig.btnMarks;
        this.axesMarks = gamepadCanvasConfig.axesMarks;
        this.animate();
    }

    drawGamepad() {
        this.ctx.fillStyle = this.gamepadCanvasConfig.backgroundFillStyle;
        this.ctx.fillRect(this.gamepadCanvasConfig.imgX,
            this.gamepadCanvasConfig.imgY,
            this.gamepadCanvasConfig.imgWidth,
            this.gamepadCanvasConfig.imgHeight
        );
        this.ctx.drawImage(
            this.gamepadCanvasConfig.domImg,
            this.gamepadCanvasConfig.imgX,
            this.gamepadCanvasConfig.imgY,
            this.gamepadCanvasConfig.imgWidth,
            this.gamepadCanvasConfig.imgHeight
        );
    }

    drawBtnMark(btnMark) {
        if (btnMark.pressed) {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.gamepadCanvasConfig.btnFillStyle;
            this.ctx.moveTo(btnMark.x, btnMark.y);
            this.ctx.arc(btnMark.x, btnMark.y, btnMark.radius, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    drawAxesMark(axesMark) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.gamepadCanvasConfig.axisStrokeStyle;
        this.ctx.arc(axesMark.x, axesMark.y, axesMark.radius, 0, 2 * Math.PI);
        this.ctx.moveTo(axesMark.x, axesMark.y);
        this.ctx.lineTo(axesMark.getX(), axesMark.getY());
        this.ctx.arc(axesMark.getX(), axesMark.getY(), axesMark.getDirectionRadius(), 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    drawAll() {
        this.drawGamepad();
        this.btnMarks.forEach(this.drawBtnMark.bind(this));
        this.axesMarks.forEach(this.drawAxesMark.bind(this));
    }

    // from http://jsfiddle.net/m1erickson/CtsY3/
    animate() {
        if (this.runAnimate) {
            requestAnimationFrame(this.animate.bind(this));
            let now = Date.now();
            let elapsed = now - this.then;
            if (elapsed > this.fpsInterval) {
                this.then = now - (elapsed % this.fpsInterval);
                this.drawAll();
                this.ctx.fillStyle = "#000";
                this.ctx.fillText("time: " + now, 5, 40);
            }
        }
    }

    processInput(byteArray) {
        let cmd = (byteArray[1]) << 8 | byteArray[2];
        this.btnMarks.forEach(function (btnMark, key) {
            btnMark.pressed = !!(cmd & (1 << key));
        });
        this.axesMarks.get(0).setAxisXPos(byteArray[3]);
        this.axesMarks.get(0).setAxisYPos(byteArray[4]);
        this.axesMarks.get(1).setAxisXPos(byteArray[5]);
        this.axesMarks.get(1).setAxisYPos(byteArray[6]);
    }
}
