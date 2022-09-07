var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("Canvas resized.");
}

resize();
window.addEventListener('resize', resize);

function fullscreen() {
    if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
    }
    else {
        canvas.mozRequestFullScreen();
    }
}

main();


///////////////////////////

function main() {
    return
}