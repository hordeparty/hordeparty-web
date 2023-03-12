function handleStart(evt, el, idx) {
    evt.preventDefault();
    $(el).addClass('btn-active');
    console.log("touch start", idx, evt.changedTouches[0].pageX, evt.changedTouches[0].pageY);
}

function handleEnd(evt, el, idx) {
    evt.preventDefault();
    $(el).removeClass('btn-active');
    console.log("touch end", idx);
}

function handleCancel(evt, el, idx) {
    evt.preventDefault();
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
    drawAxes(evt, el);
}

function handleAxesEnd(evt, el, idx) {
    evt.preventDefault();
    resetDrawAxes(el);
    console.log("touch end", idx);
}

function handleAxesCancel(evt, el, idx) {
    evt.preventDefault();
    resetDrawAxes(el);
    console.log("touch cancel", idx);
}

function handleAxesMove(evt, el, idx) {
    evt.preventDefault();
    drawAxes(evt, el);
}

function drawAxes(evt, el) {
    let x = evt.changedTouches[0].pageX - evt.changedTouches[0].target.offsetLeft;
    let y = evt.changedTouches[0].pageY - evt.changedTouches[0].target.offsetTop;
    const ctx = el.getContext("2d");
    ctx.clearRect(0, 0, el.width, el.height);
    ctx.beginPath();
    ctx.moveTo(73, 73);
    ctx.lineTo(x, y);
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.stroke();
}

function resetDrawAxes(el) {
    const ctx = el.getContext("2d");
    ctx.clearRect(0, 0, el.width, el.height);
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(0,50,200)';
    ctx.arc(73, 73, 4, 0, 2 * Math.PI);
    ctx.stroke();
}

function handleAxes() {
    let axes = document.getElementsByClassName('axes');
    for (let i = 0; i < axes.length; i++) {
        let el = axes[i];
        resetDrawAxes(el);
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
    console.log("Initialized.");
}

document.addEventListener("DOMContentLoaded", startup);