

// Currently trying to figure out whether I should put all the canvas stuff in a class or not. 
// Move resize stuff to in-waiting.
// Get everything on this page working.
// Use exp.js to experement with new features.
// How to do-not-track in-waiting and exp?
/////////////////////

console.log("Hiiiii")

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

class Paddle {
    width = 20;
    height = 100;
    padding = {
        x: 150,
        y: 30
    };
    velocity = 7;

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

    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(arg) {
        if (arg === "up") {
            this.y -= this.velocity;
        }
        if (arg === "down") {
            this.y += this.velocity;
        }
    }

    get width() {
        return this.width;
    }
}

class Ball {
    width = 20;
    height = 20;
    velocity = {
        x: 20,
        y: 20
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

    move() {
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
        this.gameLoop = new GameLoop();
    }
    
    draw() {
        this.gameBoard.drawBackground();
        this.paddleLeft.draw();
        this.paddleRight.draw();
        this.ball.draw();
    }

    processInput(arg) {
        if (arg === "ArrowUp") {
            this.paddleRight.move("up");
        }
        if (arg === "ArrowDown") {
            this.paddleRight.move("down");
        }
        if (arg === "KeyW") {
            this.paddleLeft.move("up");
        }
        if (arg === "KeyS") {
            this.paddleLeft.move("down");
        }
    }
}

main();

///////////////////////////

function main() {
    const game = new Game();
    console.log(game);
    addEventListener("keydown", (e) => {
        console.log(`Keydown: ${e.code}`);
        game.processInput(e.code);
        game.draw();
    })
}

function GameLoop() {
    processInput();
    updateGame();
    render();
}

function processInput() {
    console.log("Process input")
}
function updateGame() {
    console.log("Update game")
}
function render() {
    console.log("Render")
}

///////////////////////////