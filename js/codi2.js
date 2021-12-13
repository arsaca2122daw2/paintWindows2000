let video = document.getElementById('video');//funciones en referencia al HTML
let botonplay = document.getElementById('botonplay');
let botonpause = document.getElementById('botonpause');
let botonstop = document.getElementById('botonstop');
let timOut = document.getElementById('tiempo');
let timer = null;

botonplay.addEventListener('click', vidAction);//les decimos a los botones que´tienen que hacer. llaman a la funcion vidAction.
botonpause.addEventListener('click', vidAction);
botonstop.addEventListener('click', vidAction);
//video.addEventListener('ended', vidEnded);

function vidAction(event) {//event para los eventos click
    switch (event.target.id) {
        case "botonplay":
            playVideo();
            timer = setInterval(update, 100);
            break;
        case "botonpause":
            video.pause();
            break;
        case "botonstop":
            video.pause();
            video.currentTime = 0;
            break;
    }
}
function playVideo() {
    video.play();
    timer = setInterval(update, 100);
}
function update() {//update del tiempo
    timeOut.innerHTML = "Tiempo: " + mytime(video.currentTime) + "/" + mytime(video.duration);
}

function mytime(time) {//convierte segundos en minutos,segundos y horas.
    let hr = ~~(time / 3600);
    let min = ~~((time % 3600) / 60);
    let sec = time % 60;
    let sec_min = "";
    if (hr > 0) {
        sec_min += "" + hrs + ":" + (min < 10 ? "0" : "");
    }
    sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
    sec_min += "" + Math.round(sec);
    return sec_min; //retorna el format hr.min.sec.
}