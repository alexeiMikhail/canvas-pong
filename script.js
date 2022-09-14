

// Currently trying to figure out whether I should put all the canvas stuff in a class or not. 
// Move resize stuff to in-waiting.
// Get everything on this page working.
// Use exp.js to experement with new features.
// How to do-not-track in-waiting and exp?
/////////////////////

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

class Paddle {
    width = 20;
    height = 100;
    padding = {
        x: 150,
        y: 30
    };
    velocity = 0;
    maxVelocity = 3;

    constructor(side, canvasWidth, canvasHeight) {
        this.y = canvasHeight / 2 - this.height / 2;
        if (side === "left") {
            this.x = this.padding.x;
        }
        else if (side === "right") {
            this.x = canvasWidth - this.width - this.padding.x;
        }
        else {
            console.log("Paddle issue left/right")
        }
        this.draw();
    }

    up() {
        this.velocity = this.maxVelocity * -1;
    }

    down() {
        this.velocity = this.maxVelocity;
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.velocity;
    }

    get width() {
        return this.width;
    }
}

class Ball {
    width = 20;
    height = 20;
    velocity = {
        x: (Math.random()-.5) * 5,
        y: (Math.random()-.5) * .8
    }

    constructor(side) {
        this.y = canvas.height / 2 - this.height / 2;
        this.x = canvas.width / 2 - this.width / 2;
        this.draw();
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

class GameBoard {
    backgroundColor = "black";
    edges = {
        top: 0,
        left: 0
    }
    
    constructor() {
        this.resize();
        this.drawBackground();
        addEventListener('resize', this.resize);
    }

    resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.edges.right = canvas.width;
        this.edges.bottom = canvas.height;
        console.log("Canvas resized.");
    }

    fullscreen() {
        if (canvas.webkitRequestFullScreen) {
            canvas.webkitRequestFullScreen();
        }
        else {
            canvas.mozRequestFullScreen();
        }
    }
    
    drawBackground() {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

class Game {
    constructor() {
        this.gameBoard = new GameBoard();
        this.paddleLeft = new Paddle("left", canvas.width, canvas.height);
        this.paddleRight = new Paddle("right", canvas.width, canvas.height);
        this.ball = new Ball();
    }

    update() {
        this.paddleRight.update();
        this.paddleLeft.update();
        this.ball.update()
        this.draw()
    }

    draw() {
        this.gameBoard.drawBackground();
        this.paddleLeft.draw();
        this.paddleRight.draw();
        this.ball.draw();
    }

    keybinds = {
        "ArrowUp": [
            () => {this.paddleRight.up()}, 
            () => {this.paddleRight.velocity = 0;}],
        "ArrowDown": [
            () => {this.paddleRight.down()},
            () => {this.paddleRight.velocity = 0;}],
        "KeyW": [
            () => {this.paddleLeft.up()}, 
            () => {this.paddleLeft.velocity = 0; console.log(this.paddleLeft.velocity)}],
        "KeyS": [
            () => {this.paddleLeft.down()}, 
            () => {this.paddleLeft.velocity = 0;}],
    }   

    animate = () => {
        requestAnimationFrame(this.animate)
        this.update();
        this.draw();
    }
}

main();

///////////////////////////

function main() {
    const game = new Game();
    console.log(game);
    game.animate();
    addEventListener("keydown", (e) => {
        console.log(`Keydown: ${e.code}`);
        game.keybinds[e.code][0]()
    })
    addEventListener("keyup", (e) => {
        console.log(`Keyup: ${e.code}`);
        game.keybinds[e.code][1]()
    })
}

///////////////////////////