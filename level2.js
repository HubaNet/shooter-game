

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');   

const cellSize = 20;
const rows = 15;
const cols = 15;

function drawGrid() {
    ctx.strokeStyle = '#000000';
    for (let i = 0; i <= rows; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(cols * cellSize, i * cellSize);
        ctx.stroke();
    }
    for (let j = 0; j <= cols; j++) {
        ctx.beginPath();
        ctx.moveTo(j * cellSize, 0);
        ctx.lineTo(j * cellSize, rows * cellSize);
        ctx.stroke();
    }
}

drawGrid();

let playerX = Math.floor(cols / 2) * cellSize;
let playerY = (rows - 1) * cellSize;

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(playerX, playerY, cellSize, cellSize);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && playerX > 0) {
        playerX -= cellSize;
    } else if (event.key === 'ArrowRight' && playerX < (cols - 1) * cellSize) {
        playerX += cellSize;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawPlayer();
});
document.getElementById('leftButton').addEventListener('click', function() {
    if (playerX > 0) {
        playerX -= cellSize;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawPlayer();
});

document.getElementById('rightButton').addEventListener('click', function() {
    if (playerX < (cols - 1) * cellSize) {
        playerX += cellSize;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawPlayer();
});

document.getElementById('shootButton').addEventListener('click', function() {
    bullets.push({ x: playerX, y: playerY });
});





let bullets = [];
let score = 0;

function drawBullets() {
    ctx.fillStyle = 'yellow';
    bullets.forEach((bullet, index) => {
        ctx.fillRect(bullet.x, bullet.y, cellSize, cellSize);
        bullet.y -= cellSize * 0.1;
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
        if (bullet.x -10  <= bouncingSquareX && bullet.x +10  >= bouncingSquareX && bullet.y <= cellSize) {
            bullets.splice(index, 1);
            score++;
            document.getElementById('demo').innerText = 'Score: ' + score;
        }
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        bullets.push({ x: playerX, y: playerY });
    }
});


let bouncingSquareX = 0;
let bouncingSquareDirection = 0.1;

function drawBouncingSquare() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(bouncingSquareX, 0, cellSize, cellSize);
    bouncingSquareX += bouncingSquareDirection * cellSize;
    if (bouncingSquareX <= 0 || bouncingSquareX >= (cols - 1) * cellSize) {
        bouncingSquareDirection *= -1;
    }
}

let enemyBullets = [];


function drawEnemyBullets() {
    ctx.fillStyle = 'green';
    enemyBullets.forEach((bullet, index) => {
        ctx.fillRect(bullet.x, bullet.y, cellSize, cellSize);
        bullet.y += cellSize * 0.1;
        if (bullet.y > canvas.height) {
            enemyBullets.splice(index, 1);
        }
        if (bullet.x - 5 < playerX &&bullet.x +5 > playerX && bullet.y + cellSize >= playerY && bullet.y <= playerY + cellSize) {
            window.location.href = 'gameover.html';

        
            
        }
    });
}

setInterval(() => {
    enemyBullets.push({ x: bouncingSquareX, y: cellSize });
}, 1000);


function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawPlayer();
    drawBullets();
    drawBouncingSquare();
    drawEnemyBullets();
    requestAnimationFrame(update);
}

update();

