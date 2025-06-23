if (window.innerWidth > 1100) {
    var circleRadius = 25;
    var enemyRadius = 10;
    var acceleration = 1;
} else {
    var circleRadius = 12.5;
    var enemyRadius = 5;
    var acceleration = 0.5;
    
}

let player = {
    elem: document.getElementById('player'),
    x: window.innerWidth/2 - circleRadius,
    xc: window.innerWidth/2,
    y: window.innerHeight/2 - circleRadius,
    yc: window.innerHeight/2,
    vx: 0,
    vy: 5,
    pressingLeft: false,
    pressingRight: false
}

let gameStarted = 0;
let gameStopped = 0;
let score = 0;

try {
    const parsedUrl = new URL(window.location.href);
    frameRate = parsedUrl.searchParams.get("frameRate")
} catch (error) {
    frameRate = 60
}

player.elem.style.left = player.x + "px"
player.elem.style.top = player.y + "px"

let numOfEnemies = 0;
let enemies = [];

class Enemy {
    constructor(x, y, life){
        this.x = x,
        this.xc = x + enemyRadius,
        this.y = y,
        this.yc = y + enemyRadius,
        this.life = life
    }
}

let uranium = {
    elem: document.getElementById('uranium'),
    x: window.innerWidth/2,
    xc: this.x + enemyRadius,
    y: window.innerHeight/2,
    yc: this.y + enemyRadius,
}

function phisFrame(){
    if (!gameStopped) {
        setTimeout(()=>{



            player.vy -= 0.1
            if (player.pressingLeft && player.pressingRight) {} else if (player.pressingLeft && player.vx > -5 * acceleration) {
                player.vx -= 0.25 * acceleration
            } else if (player.pressingRight && player.vx < 5 * acceleration) {
                player.vx += 0.25 * acceleration
            }
            player.x += player.vx
            player.y -= player.vy
            player.xc = player.x + circleRadius
            player.yc = player.y + circleRadius
            player.elem.style.left = player.x + "px"
            player.elem.style.top = player.y + "px"

            enemies.forEach((enem)=>{
                enem.life += 1
                if (getDistance(enem.xc, player.xc, enem.yc, player.yc) < 35 * acceleration) {
                    if (enem.life > 120) {
                        gameOver()
                    }
                }
            })
            if (player.xc > window.innerWidth || player.xc < 0 || player.yc > window.innerHeight || player.yc < 0) (
                gameOver()
            )

            if( getDistance(uranium.xc, player.xc, uranium.yc, player.yc) < 35 * acceleration) {
                moveUranium()
                createEnemy(Math.floor((Math.random()*(window.innerWidth - 30)+1) / 20) * 20, Math.floor((Math.random()*(window.innerHeight - 30)+1) / 20) * 20)
                score++
                document.getElementById('score').textContent = score
            }

            phisFrame()
        }, 1000/frameRate)
        
    }
}

function gameStart() {

    phisFrame()

    addEventListener("keydown", (e)=>{
        if (e.code == "KeyW" || e.code == "Space" || e.code == "ArrowUp" ) {   player.vy += 5  * acceleration }
        else if (e.code == "KeyA" || e.code == "ArrowLeft") {    player.pressingLeft = true;    }
        else if (e.code == "KeyD" || e.code == "ArrowRight") {   player.pressingRight = true;   }
        else if (e.code == "Escape" || e.code == "KeyP") {   gameStopped = !gameStopped; phisFrame();        }
    })
    
    addEventListener("keyup", (e)=>{
        if (e.code == "KeyA" || e.code == "ArrowLeft") {    player.pressingLeft = false;    }
        else if (e.code == "KeyD" || e.code == "ArrowRight") {   player.pressingRight = false;   }
    })

    document.getElementById('leftbtn').addEventListener("touchstart", ()=> {player.pressingLeft = true})
    document.getElementById('rightbtn').addEventListener("touchstart", ()=> {player.pressingRight = true})
    document.getElementById('leftbtn').addEventListener("touchend", ()=> {player.pressingLeft = false})
    document.getElementById('rightbtn').addEventListener("touchend", ()=> {player.pressingRight = false})    
}

function createEnemy(x, y) {
    enemies["" + numOfEnemies] = new Enemy(x, y, 0)
    document.getElementById("enemies").innerHTML += `<div class="enemy" id="enemy${numOfEnemies}"><div>`
    document.getElementById("enemy" + numOfEnemies).style.left = x + "px"
    document.getElementById("enemy" + numOfEnemies).style.top = y + "px"
    console.log(enemies);
    numOfEnemies++
}

// createEnemy(Math.floor((Math.random()*(window.innerWidth - 30)+1) / 20) * 20, Math.floor((Math.random()*(window.innerHeight - 30)+1) / 20) * 20)

function gameOver() {
    document.getElementById("gameOverText").style.transition = "transform 1s ease"
    document.getElementById("gameOverText").style.transform = "translateX(0)"
    gameStopped = 1
    setTimeout(()=>{location.reload()}, 2000)
}

addEventListener("keydown", ()=>{
    if (!gameStarted) {
        gameStarted = 1
        gameStart()
        document.getElementById('score').style.color = "#777"
        document.getElementById('buttons').style.opacity = "0"
        setTimeout(()=>{
            moveUranium()
        }, 2000)

    }
})

function moveUranium() {
    randomW = Math.floor((Math.random()*(window.innerWidth - 30)+1) / 20) * 20
    randomH = Math.floor((Math.random()*(window.innerHeight - 30)+1) / 20) * 20
    
    if (enemies[0]) {
            enemies.forEach((enem)=>{
            if(randomW == enem.x && randomH == enem.y) {
                moveUranium()
            } else {
                uranium.x = randomW
                uranium.y = randomH
                return;
            }
        })
    } else {
        uranium.x = randomW
        uranium.y = randomH
    }
    uranium.xc = uranium.x + enemyRadius
    uranium.yc = uranium.y + enemyRadius
    uranium.elem.style.left = uranium.x + "px"
    uranium.elem.style.top = uranium.y + "px"
}

function getDistance(x1, x2, y1, y2) {
    let a = (x2 - x1) ** 2
    let b = (y2 - y1) ** 2
    let distance = (a + b) ** 0.5
    return distance
}
document.getElementById("jumpbtn").addEventListener("touchstart", ()=>{
    if (!gameStarted) {
        gameStarted = 1
        gameStart()
        document.getElementById('score').style.color = "#777"
        document.getElementById('buttons').style.opacity = "0"
        setTimeout(()=>{
            moveUranium()
        }, 2000)
    } else {
        player.vy += 5 * acceleration
    }
})

