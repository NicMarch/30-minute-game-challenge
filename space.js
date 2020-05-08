const cvs = document.getElementById("space");
const ctx = cvs.getContext("2d");
ctx.fillStyle="#030B52";
ctx.fillRect(0, 0, cvs.width, cvs.height);
const box = 20;
let shipX = 15 * box;
const shipY = 25 * box;
let shipXOld = shipX;
let shipYOld = shipY;
let bullets = [];
let score = 0;
let enemyX = 0 * box;
let enemyY = 5 * box;
let interval = 80;
let hits = 0;
let enemyHorizontalStep = .5;
let enemyVerticalStep  = 1;

// Control the space ship
let d;
document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if(key == 37){
        d = "LEFT"
    } else if(key == 39) {
        d = "RIGHT"
    } else if(key == 32) {
        d = "FIRE"
    }
}

function drawExplosion() {
    ctx.fillStyle = "orange";
    ctx.fillRect( enemyX, enemyY, box, box);
    ctx.fillRect( enemyX-box, enemyY, box, box);
    ctx.fillRect( enemyX-box-box, enemyY, box, box);
    ctx.fillRect( enemyX+box, enemyY, box, box);
    ctx.fillRect( enemyX+box+box, enemyY, box, box);
    ctx.fillRect( enemyX, enemyY-box, box, box);            
    ctx.fillRect( enemyX, enemyY-box-box, box, box);
    ctx.fillRect( enemyX, enemyY+box, box, box);
    ctx.fillRect( enemyX, enemyY+box+box, box, box);
}

function gameOver(){
    drawExplosion();
    clearInterval(game);
}

function draw() {
    // Draw background
    ctx.fillStyle="#030B52";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // Move ship
    if (d == "LEFT" && shipX>=box){
        shipX -= box;
        d = "";
    }
    if (d == "RIGHT" && shipX<29*box){
        shipX += box;
        d = "";
    }
    if (d == "FIRE"){
        score-=2;
        let newBullet = {x: shipX+(box/2)-2, y: shipY};
        bullets.unshift(newBullet);
        d = "";
    }
    // Draw space ship
    ctx.fillStyle = "white";
    ctx.fillRect(shipX, shipY, box, box);
    ctx.fillRect(shipX-box, shipY+box, box, box);
    ctx.fillRect(shipX+box, shipY+box, box, box);
 
    // Move enemy ship
    if (enemyX < 29*box) {
        enemyX = enemyX + (enemyHorizontalStep * box);
    } else {
        enemyX = 0 * box;
        enemyY = enemyY + (enemyVerticalStep * box);
    }
     // check if enemy collides with ship
     if(enemyX == shipX && enemyY == shipY) {
         gameOver();
     }

    ctx.fillStyle = "red";
    ctx.fillRect(enemyX, enemyY, box, box);

    // move and draw bullets
    for(let i=0; i<bullets.length; i++) {
        bullets[i].x = bullets[i].x;
        bullets[i].y = bullets[i].y - box;
        ctx.fillStyle = "yellow";
        ctx.fillRect( bullets[i].x, bullets[i].y, box/4, box);

        // check collision bullet / enemy
        if (Math.abs(bullets[i].x - enemyX) < (box*enemyHorizontalStep) && Math.abs(bullets[i].y - enemyY) < box) {
            score+=20;
            hits++;
            bullets.splice(i, 1);

            drawExplosion();

            // reset enemy position
            enemyX = 0 * box;
            enemyY += box;

            // increase enemy speed when hits increase 
            (enemyHorizontalStep < 1) ? enemyHorizontalStep = enemyHorizontalStep + (.05  * hits) : enemyHorizontalStep;
        } else {
            if (bullets[i].y < box) {
                bullets.splice(i, 1);
            }
        }
    } 

     // Show Score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("SCORE: " + score + "   HITS: " + hits, 4 * box, 1.5 * box);
}

let game = setInterval(draw, interval);



