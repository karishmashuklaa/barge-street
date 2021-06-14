const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

startScreen.addEventListener('click', start);

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}
let player = {};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
    console.log(keys);
}

function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    console.log(keys);
}

function gamePlay() {
    console.log("Hey I am clicked");
    if(player.start){
        window.requestAnimationFrame(gamePlay);
    }
}

// starts the game
function start() {
    player.start = true;
    window.requestAnimationFrame(gamePlay);
}