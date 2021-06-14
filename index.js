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
    speed: 7
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

function moveLines() {
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item) {

        if(item.y >= 700){
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function moveEnemies() {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item) {

        if(item.y >= 850){
            item.y = -400;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gamePlay() {
    console.log("Hey I am clicked");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();

    if(player.start){

        moveLines();
        moveEnemies();

        // road.top is the top of the road in px 
        if(keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }

         // road.bottom is the bottom of the road in px 
        if(keys.ArrowDown && player.y < (road.bottom - 70)) { player.y += player.speed }

        if(keys.ArrowLeft && player.x > 0) { player.x -= player.speed }

        // road.width is the total width of the road in px and 50 is the width of the car
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

    for(i=0; i<6; i++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (i*150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for(i=0; i<4; i++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((i+1) * 350) * -1; // for negative position
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.background = 'red';
        // to generate random positions for enemy cars
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
}