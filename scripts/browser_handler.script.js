const msg = document.getElementById('message_to_show');
const timer = document.getElementById('time_task_off');
const elem = document.getElementById("main_screen");
let display_msg = 'No strict schedule started yet. Closing in 8 seconds!';
let display_timer_hours = 0;
let display_timer_mins = 0;
let display_timer_sec = 9;
let timing_interval;

const changeDOM = () => {
    timing_interval = setInterval(() => {
        msg.innerHTML = display_msg;
        if (display_timer_sec == 0) {
            if (display_timer_mins > 0) {
                display_timer_mins--;
                display_timer_sec = 60;
            } else {
                if (display_timer_hours > 0) {
                    display_timer_hours--;
                    display_timer_mins = 59;
                    display_timer_sec = 60;
                }
            }
        }

        if (display_timer_sec > 0)
            display_timer_sec--;
        timer.innerHTML = `
            ${display_timer_hours < 10 ? '0' : ''}${display_timer_hours} : 
            ${display_timer_mins < 10 ? '0' : ''}${display_timer_mins} : ${display_timer_sec < 10 ? '0' : ''}${display_timer_sec}`
        
        if (
            display_timer_hours == 0 &&
            display_timer_mins == 0 &&
            display_timer_sec == 0
        ) closeWindowTab();
    }, 1000)
}
changeDOM();

const closeWindowTab = () => {
    clearInterval(timing_interval);
    window.close();
}

const changeScheduleData = () => {
    fetch('http://127.0.0.1:3000/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then((data) => {
            display_msg = data.data.msg;
            display_timer_hours = data.data.hours;
            display_timer_mins = data.data.mins;
            display_timer_sec = data.data.secs;
        })
        .then((json) => console.log(json));
}
changeScheduleData();

const browserControl = () => {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

window.onblur = function () {
    setTimeout(() => {
        // window.open("http://127.0.0.1:4201/views/", "_blank");
        runPyScriptToHibernateDevice();
    }, 2000)
}

document.onkeydown = function (e) {
    return false;
}