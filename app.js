let player = {
    elem: document.getElementById('player'),
    x: window.innerWidth/2,
    xc: window.innerWidth/2 + 25,
    y: window.innerHeight/2,
    yc: window.innerHeight/2 + 25,
    vx: 0,
    vy: 5,
    pressingLeft: false,
    pressingRight: false
}

let gameStarted = 0;
let gameStopped = 0;
let score = 0;

player.elem.style.left = player.x + "px"
player.elem.style.top = player.y + "px"

let numOfEnemies = 0;
let enemies = [];

class Enemy {
    constructor(x, y, life){
        this.x = x,
        this.xc = x + 10,
        this.y = y,
        this.yc = y + 10,
        this.life = life
    }
}

let uranium = {
    elem: document.getElementById('uranium'),
    x: window.innerWidth/2,
    xc: this.x + 25,
    y: window.innerHeight/2,
    yc: this.y + 25,
}

function phisFrame(){
    if (!gameStopped) {
        requestAnimationFrame(()=>{



            player.vy -= 0.1
            if (player.pressingLeft && player.pressingRight) {} else if (player.pressingLeft && player.vx > -5) {
                player.vx -= 0.25
            } else if (player.pressingRight && player.vx < 5) {
                player.vx += 0.25
            }
            player.x += player.vx
            player.y -= player.vy
            player.xc = player.x + 25
            player.yc = player.y + 25
            player.elem.style.left = player.x + "px"
            player.elem.style.top = player.y + "px"

            enemies.forEach((enem)=>{
                if (getDistance(enem.xc, player.xc, enem.yc, player.yc) < 35) {
                    gameOver()
                }
            })
            if (player.x > window.innerWidth || player.x < -50 || player.y > window.innerHeight || player.y < -50) (
                gameOver()
            )

            if( getDistance(uranium.xc, player.xc, uranium.yc, player.yc) < 35) {
                moveUranium()
                createEnemy(Math.floor((Math.random()*(window.innerWidth - 30)+1) / 20) * 20, Math.floor((Math.random()*(window.innerHeight - 30)+1) / 20) * 20)
                score++
                document.getElementById('score').textContent = score
            }

            phisFrame()
        })
    }
}

function gameStart() {

    phisFrame()

    addEventListener("keydown", (e)=>{
        if (e.code == "KeyW" || e.code == "Space" || e.code == "ArrowUp" ) {   player.vy += 5   }
        else if (e.code == "KeyA" || e.code == "ArrowLeft") {    player.pressingLeft = true;    }
        else if (e.code == "KeyD" || e.code == "ArrowRight") {   player.pressingRight = true;   }
        else if (e.code == "Escape") {   gameOver()                     }
    })
    
    addEventListener("keyup", (e)=>{
        if (e.code == "KeyA" || e.code == "ArrowLeft") {    player.pressingLeft = false;    }
        else if (e.code == "KeyD" || e.code == "ArrowRight") {   player.pressingRight = false;   }
    })

    
}

function createEnemy(x, y) {
    enemies["" + numOfEnemies] = new Enemy(x, y, 0)
    document.getElementById("enemies").innerHTML += `<div class="enemy" id="enemy${numOfEnemies}"><div>`
    document.getElementById("enemy" + numOfEnemies).style.left = x + "px"
    document.getElementById("enemy" + numOfEnemies).style.top = y + "px"
    numOfEnemies++
}

// createEnemy(Math.floor((Math.random()*(window.innerWidth - 30)+1) / 20) * 20, Math.floor((Math.random()*(window.innerHeight - 30)+1) / 20) * 20)

function gameOver() {
    document.getElementById("gameOverText").style.transition = "transform 1s ease"
    document.getElementById("gameOverText").style.transform = "translateX(calc(100% - 100px))"
    gameStopped = 1
}

addEventListener("keydown", ()=>{
    if (!gameStarted) {
        gameStarted = 1
        gameStart()
        document.getElementById('score').style.color = "#777"
        setTimeout(()=>{
            moveUranium()
        }, 2000)

    }
})

function moveUranium() {
    uranium.x = Math.floor((Math.random()*(window.innerWidth - 30)+1) / 20) * 20
    uranium.y = Math.floor((Math.random()*(window.innerHeight - 30)+1) / 20) * 20
    uranium.xc = uranium.x + 10
    uranium.yc = uranium.y + 10
    uranium.elem.style.left = uranium.x + "px"
    uranium.elem.style.top = uranium.y + "px"
}

function getDistance(x1, x2, y1, y2) {
    let a = (x2 - x1) ** 2
    let b = (y2 - y1) ** 2
    let distance = (a + b) ** 0.5
    return distance
}

