let gamePadHandler = new GamepadHandler();
let screenGamepad = new FakeGamepad("Screen", "screen")
gamePadHandler.addController(5, screenGamepad);
gamePadHandler.controllerEnabledIdx = 5;

function handleStart(evt, el, idx) {
    evt.preventDefault();
    screenGamepad.buttons[idx].pressed = true;
    screenGamepad.buttons[idx].touched = true;
    $(el).addClass('btn-active');
}

function handleEnd(evt, el, idx) {
    evt.preventDefault();
    screenGamepad.buttons[idx].pressed = false;
    screenGamepad.buttons[idx].touched = false;
    $(el).removeClass('btn-active');
}

function handleCancel(evt, el, idx) {
    handleEnd(evt, el, idx);
    console.log("touch cancel", idx);
}

function addBtn(width, height, bottom, right) {
    $('#btn-container').append(
        $('#btn-template').clone()
            .removeClass('btn-template')
            .addClass('btn')
            .removeAttr('id')
            .css({
                'width': width, 'height': height, 'bottom': bottom, 'right': right
            })
    );
}

function handleAxesStart(evt, el, idx) {
    evt.preventDefault();
    drawAxes(evt, el, idx);
}

function handleAxesEnd(evt, el, idx) {
    evt.preventDefault();
    resetDrawAxes(el, idx);
}

function handleAxesCancel(evt, el, idx) {
    evt.preventDefault();
    resetDrawAxes(el, idx);
    console.log("touch cancel", idx);
}

function handleAxesMove(evt, el, idx) {
    evt.preventDefault();
    drawAxes(evt, el, idx);
}

function drawAxes(evt, el, idx) {
    for (let i = 0; i < evt.changedTouches.length; i++) {
        if (evt.changedTouches[i].target === el) {
            let x = evt.changedTouches[i].pageX - evt.changedTouches[i].target.offsetLeft;
            let y = evt.changedTouches[i].pageY - evt.changedTouches[i].target.offsetTop;
            const ctx = el.getContext("2d");
            ctx.clearRect(0, 0, el.width, el.height);
            ctx.beginPath();
            ctx.moveTo(73, 73);
            ctx.lineTo(x, y);
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.stroke();
            setAxisFromTouch(x, y, idx);
        }
    }
}

function setAxisFromTouch(x, y, idx) {
    let maxX = Math.min((x - 73), 73);
    let posX = Math.max(maxX, -73) / 73;
    let maxY = Math.min((y - 73), 73);
    let posY = Math.max(maxY, -73) / 73;
    if (idx === 0) {
        screenGamepad.axes[0] = posX;
        screenGamepad.axes[1] = posY;
    } else if (idx === 1) {
        screenGamepad.axes[2] = posX;
        screenGamepad.axes[3] = posY;
    }
}

function resetDrawAxes(el, idx) {
    const ctx = el.getContext("2d");
    ctx.clearRect(0, 0, el.width, el.height);
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(0,50,200)';
    ctx.arc(73, 73, 4, 0, 2 * Math.PI);
    ctx.stroke();
    setAxisFromTouch(73, 73, idx);
}

function handleAxes() {
    let axes = document.getElementsByClassName('axes');
    for (let i = 0; i < axes.length; i++) {
        let el = axes[i];
        resetDrawAxes(el, i);
        el.addEventListener("touchstart", (evt) => {
            handleAxesStart(evt, el, i);
        });
        el.addEventListener("touchend", (evt) => {
            handleAxesEnd(evt, el, i);
        });
        el.addEventListener("touchcancel", (evt) => {
            handleAxesCancel(evt, el, i);
        });
        el.addEventListener("touchmove", (evt) => {
            handleAxesMove(evt, el, i);
        });
    }

}

function startup() {
    addBtn('9.5%', '16%', '26.5%', '12.5%'); // btn0
    addBtn('9.5%', '16%', '43.5%', '4.5%'); // btn1
    addBtn('9.5%', '16%', '43.5%', '20.5%'); // btn2
    addBtn('9.5%', '16%', '59.5%', '12.5%'); // btn3

    addBtn('14.5%', '10%', '81.5%', '75.5%'); // btn4
    addBtn('14.5%', '10%', '81.5%', '9.5%'); // btn5
    addBtn('14.5%', '8%', '91.5%', '75.5%'); // btn6
    addBtn('14.5%', '8%', '91.5%', '9.5%'); // btn7

    addBtn('6.5%', '7%', '43.5%', '54.5%'); // btn8
    addBtn('6.5%', '7%', '43.5%', '39.5%'); // btn9

    addBtn('15%', '6%', '0%', '58.5%'); // btn10
    addBtn('15%', '6%', '0%', '26.5%'); // btn11

    addBtn('9.5%', '16%', '60.5%', '78%'); // btn12
    addBtn('9.5%', '16%', '26.5%', '78%'); // btn13
    addBtn('8.5%', '16%', '43.5%', '87.5%'); // btn14
    addBtn('8.5%', '16%', '43.5%', '69.5%'); // btn15

    handleAxes();

    let btns = document.getElementsByClassName('btn');
    for (let i = 0; i < btns.length; i++) {
        let el = btns[i];
        el.addEventListener("touchstart", (evt) => {
            handleStart(evt, el, i);
        });
        el.addEventListener("touchend", (evt) => {
            handleEnd(evt, el, i);
        });
        el.addEventListener("touchcancel", (evt) => {
            handleCancel(evt, el, i);
        });
    }
}

document.addEventListener("DOMContentLoaded", startup);