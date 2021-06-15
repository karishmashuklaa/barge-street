const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}
let player = {
    speed: 7,
    score: 0
};

startScreen.addEventListener('click', start);
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

// when the player car crashes into an enemy car 
function isCollide(car,enemy) {
    carPosition = car.getBoundingClientRect();
    enemyPosition = enemy.getBoundingClientRect();
    
    return !((carPosition.bottom < enemyPosition.top) || (carPosition.top > enemyPosition.bottom) || (carPosition.right < enemyPosition.left) || (carPosition.left > enemyPosition.right))
}


// To move lines
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

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "GAME OVER! 👾 <br> FINAL SCORE: " + player.score + "<br> CLICK HERE TO PLAY AGAIN!"
}

// To move enemy cars
function moveEnemies(car) {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item) {

        if(isCollide(car,item)) {
            console.log("CARS CRASHED!");
            endGame();
        }
        
        if(item.y >= 850){
            item.y = -400;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }

        item.y += player.speed;
        item.style.top = item.y + "px";

    })
}

// starts the game
function start() {

    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
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
        enemyCar.style.backgroundColor = randomColor();
        // to generate random positions for enemy cars
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
}

// Actual game
function gamePlay() {
    console.log("GAME TIME!!!");
    let car = document.querySelector('.car');
    // getBoundingClientRect() gives you the entire position 
    let road = gameArea.getBoundingClientRect();

    if(player.start){

        moveLines();
        moveEnemies(car);

        // road.top is the top of the road in px 
        if(keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }

         // road.bottom is the bottom of the road in px 
        if(keys.ArrowDown && player.y < (road.bottom - 85)) { player.y += player.speed }

        if(keys.ArrowLeft && player.x > 0) { player.x -= player.speed }

        // road.width is the total width of the road in px and 50 is the width of the car
        if(keys.ArrowRight && player.x < (road.width - 70)) { player.x += player.speed }

        // concat px 
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        player.score++;
        let finalScore = player.score - 1;
        score.innerText = "Score:" + finalScore;
    }
}

// generate random hex colors
function randomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return randomColor;
}

