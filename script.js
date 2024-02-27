let timer;
let isRunning = false;
let lapCount = 1;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("controls").innerHTML = `
            <button onclick="startStop()">Resume</button>
            <button onclick="reset()">Reset</button>
        `;
    } else {
        timer = setInterval(updateTime, 1000);
        document.getElementById("controls").innerHTML = `
            <button onclick="startStop()">Pause</button>
            <button onclick="lap()">Lap</button>
            <button onclick="reset()">Reset</button>
        `;
    }
    isRunning = !isRunning;
}

function updateTime() {
    const timeElement = document.getElementById("time");
    const time = timeElement.innerText.split(":");
    let hours = parseInt(time[0]);
    let minutes = parseInt(time[1]);
    let seconds = parseInt(time[2]);

    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    timeElement.innerText = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function lap() {
    const lapTimesElement = document.getElementById("lap-times");
    const currentTime = document.getElementById("time").innerText;
    lapTimesElement.innerHTML += `<p>Lap ${lapCount}: ${currentTime}</p>`;
    lapCount++;
}

function reset() {
    clearInterval(timer);
    document.getElementById("time").innerText = "00:00:00";
    document.getElementById("controls").innerHTML = `
        <button onclick="startStop()">Start</button>
        <button onclick="lap()">Lap</button>
        <button onclick="reset()">Reset</button>
    `;
    document.getElementById("lap-times").innerHTML = "";
    isRunning = false;
    lapCount = 1;
}
