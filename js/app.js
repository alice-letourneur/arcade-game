
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 100;
    this.height = 67;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 606) {
        this.x = 0;
    }
};

// Drew boxes to figure out the 2D collisions detection
// function drawBox(x, y, width, height, color) {
//     ctx.beginPath();
//     ctx.rect(x, y, width, height);
//     ctx.lineWidth = 2;
//     ctx.strokeStyle = color;
//     ctx.stroke();
// };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    // Drew boxes to figure out the 2D collisions detection
    // drawBox(this.x, this.y + 76 , 100, 67, "yellow");
};


// Now write your own player class

var Player = function(x, y, speed) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 300;
    this.y = 480;
    this.speed = 100;
    this.width = 70;
    this.height = 75;
}

Player.prototype.update = function(dt) {
    this.checkCollisions();

//Making sure the Player can not move off screen
    if (this.x > 550) {
        this.x = 0;
    }
    if (this.x < 0) {
        this.x = 500;
    }
    if (this.y > 500) {
        this.y = 480;
    }
    if (this.y < 50) {
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// Drew boxes to figure out the 2D collisions detection
    // drawBox(this.x + 8, this.y + 60, 77, 80, "red");
};
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.handleInput = function(key) {
    if (key == "left") {
        this.x = this.x - 100;
    }
    if (key == "right") {
        this.x = this.x + 100;
    }
    if (key == "up") {
        this.y = this.y - 81;
    }
    if (key == "down") {
        this.y = this.y + 81;
    }
};

var Rock = function(x, y) {
    this.sprite = 'images/Rock.png';
    this.x = x;
    this.y = y
}

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
};

var allRocks = [new Rock(0, 480), new Rock(100, 480), new Rock(200, 480), new Rock(200, 390), new Rock(305, 50), new Rock(405, 50)];


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [new Enemy(-430, 310, 50), new Enemy(-150, 310, 75), new Enemy(-100, 140, 100), new Enemy(-100, 140, 50), new Enemy(-100, 225, 25), new Enemy(-100, 225, 75)];


Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        var enemy = allEnemies[i];
        if (enemy.x < (this.x + 8) + this.width &&
        enemy.x + enemy.width > (this.x + 8) &&
        (enemy.y + 76) < (this.y + 60) + this.height &&
        enemy.height + (enemy.y + 76) > (this.y + 60)) {
            this.reset();
        };
    };
};
// Place the player object in a variable called player

var player = new Player();

Player.prototype.reset = function() {
    this.x = 300;
    this.y = 480;
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
