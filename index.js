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
let player = {
    speed: 5
};

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
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();

    if(player.start){
        if(keys.ArrowUp) { player.y -= player.speed }
        if(keys.ArrowDown) { player.y += player.speed }
        if(keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        // road.width is the total width of the road and 50 is the width of the car
        if(keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed }

        // concat px 
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
    }
}
// starts the game
function start() {

    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');

    player.start = true;
    window.requestAnimationFrame(gamePlay);

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
}