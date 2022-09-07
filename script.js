var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("Canvas resized.");
    drawBackground();
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
    drawBackground();
}

function drawBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//////////////////////////

class Paddle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

paddle1 = new Paddle(20, 20, 20, 100);
paddle2 = new Paddle(canvas.width - 20 - 20, 20, 20, 100);

paddle1.draw();
paddle2.draw();