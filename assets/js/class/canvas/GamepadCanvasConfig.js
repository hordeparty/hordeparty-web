class GamepadCanvasConfig {

    btnMarks = new Map();

    axesMarks = new Map();

    fps = 5;

    domCanvas;

    domImg;

    imgX = 0

    imgY = 0;

    imgWidth = 640;

    imgHeight = 453;

    backgroundFillStyle = 'rgb(150,150,150)';

    btnFillStyle = 'rgb(0,100,200)';

    axisStrokeStyle = 'rgb(0,50,200)';

    constructor(canvasId, imgId, fps) {
        this.domCanvas = document.getElementById('canvas-stream');
        this.domImg = document.getElementById('standard-gamepad');
        if (canvasId) {
            this.domCanvas = document.getElementById(canvasId);
        }
        if (imgId) {
            this.domImg = document.getElementById(imgId);
        }
        if (fps) {
            this.fps = fps;
        }
        this.btnMarks.set(0, new BtnMark(517, 266, 17));
        this.btnMarks.set(1, new BtnMark(564, 216, 17));
        this.btnMarks.set(2, new BtnMark(468, 216, 17));
        this.btnMarks.set(3, new BtnMark(517, 167, 17));

        this.btnMarks.set(4, new BtnMark(123, 99, 10));
        this.btnMarks.set(5, new BtnMark(520, 99, 10));
        this.btnMarks.set(6, new BtnMark(123, 78, 10));
        this.btnMarks.set(7, new BtnMark(520, 78, 10));

        this.btnMarks.set(8, new BtnMark(274, 229, 10));
        this.btnMarks.set(9, new BtnMark(361, 229, 10));
        this.btnMarks.set(10, new BtnMark(222, 305, 35));
        this.btnMarks.set(11, new BtnMark(416, 305, 35));

        this.btnMarks.set(12, new BtnMark(123, 157, 14));
        this.btnMarks.set(13, new BtnMark(123, 274, 14));
        this.btnMarks.set(14, new BtnMark(64, 215, 14));
        this.btnMarks.set(15, new BtnMark(182, 215, 14));

        this.axesMarks.set(0, new AxesMark(222, 305, 35, 4));
        this.axesMarks.set(1, new AxesMark(416, 305, 35, 4));
    }
}