const screenSize = 700;
const entity = {w: 30, h: 20};
const projectile = {w: 5, h: 30};
let updateTick = 0;
let score = 0;
let playerProjectiles = new Array(0);
let projectiles = new Array();
let projectileManager = new ProjectileManager();
let enemies = new Array();
let enemyManager = new EnemyManager();
let player = new Player();
let movingLeft;
let updateSpeed = 0.8;
let imgEnemy, imgShip, imgBg, imgLaser;
let gameRunning = true;

function isIntersecting(a1, b1, a2, b2) {
    if (a1.x >= b1.x + a2.w + a2.h || b1.x >= a1.x + b2.w + b2.h) {
        return false;
    }
    if (a1.y >= b1.y + a2.w + a2.h || b1.y >= a1.y + b2.w + b2.h) {
        return false;
    }
    return true;
}

function movementInput() {
    if(keyIsDown(LEFT_ARROW)) {
        player.move(-4);            //4px förflyttning per uppdatering
    }
    if(keyIsDown(RIGHT_ARROW)) {
        player.move(4);
    }
}

function keyPressed() {
    if(keyCode === 69) {            //keycode 69 motsvarar "E"
        player.shoot();
    }
}

function RNG(num) {
    return Math.floor(Math.random() * num);
}

function preload() {
    imgEnemy = loadImage("assets/enemy.png");
    imgShip = loadImage("assets/playerShip.png");
    imgBg = loadImage("assets/bg.jpg");
    imgLaser = loadImage("assets/laser.png");
    soundFormats('mp3', 'ogg');
    laserSound = loadSound('assets/laser.mp3');
}

function setup() {
    createCanvas(screenSize, screenSize);
    textSize(15);
    frameRate(144);
    laserSound.setVolume(0.025);
}

function draw() {
    if(gameRunning) {
        updateTick++;
        image(imgBg, 0, 0, screenSize, screenSize);
        movementInput();
        projectileManager.move();
        enemyManager.move();
        enemyManager.shoot(updateTick);
        projectileManager.checkCollision();
        projectileManager.display();
        player.display();
        enemyManager.display();
        text('Score: ', 10, 645);
        text(score, 60, 646);
    }
    else {
        fill(38, 38, 38);
        image(imgBg, 0, 0, screenSize, screenSize);
        textSize(40);
        text("You lost", 300, 325);
        textSize(20);
        text("Score: " + score, 340, 355);
    }
}