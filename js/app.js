
// Drew boxes to figure out the 2D collisions detection
// function drawBox(x, y, width, height, color) {
//     ctx.beginPath();
//     ctx.rect(x, y, width, height);
//     ctx.lineWidth = 2;
//     ctx.strokeStyle = color;
//     ctx.stroke();
// }

// -------------------- Enemies our player must avoid -------------------------------
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 100;
    this.height = 67;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt; // multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    if (this.x > 606) {
        this.x = 0;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// Drew boxes to figure out the 2D collisions detection
    // drawBox(this.x, this.y + 76 , 100, 67, "yellow");
};

var allEnemies = [new Enemy(-430, 310, 50), new Enemy(-150, 310, 75), new Enemy(-100, 140, 100), new Enemy(-100, 140, 50), new Enemy(-100, 225, 25), new Enemy(-100, 225, 75)];


// ----------------------------------- Player ----------------------------------------

var Player = function(x, y, speed) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 300;
    this.y = 400;
    this.speed = 100;
    this.width = 70;
    this.height = 75;
};

Player.prototype.update = function(dt) {
//Check if there is a collision between the player and the bugs
    this.checkCollisionsBugs();
//Make sure the Player can not move off screen
    if (this.x > 550) {
        this.x = 500;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.y < 50) {
        this.reset();
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// Draw boxes to figure out the 2D collisions detection
    // drawBox(this.x + 8, this.y + 60, 77, 80, "red");
};

//Make player move up/down/right/left depending on the key pressed
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


Player.prototype.checkCollisionsBugs = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        var enemy = allEnemies[i];
        if (enemy.x < (this.x + 8) + this.width &&
        enemy.x + enemy.width > (this.x + 8) &&
        (enemy.y + 76) < (this.y + 60) + this.height &&
        enemy.height + (enemy.y + 76) > (this.y + 60)) {
            this.reset();
        }
    }
        // if (this.x < 300 && this.y > 350) {
        //     this.x = 300; 
        //     this.y = this.y;
        // };
    // };
};

// Place the player object in a variable called player
var player = new Player();

Player.prototype.reset = function() {
    this.x = 300;
    this.y = 400;
};

// ----------------------------------- Obstacles : Rock & Trees & Bushes----------------------------------------

var Rock = function(x, y) {
    this.sprite = 'images/Rock.png';
    this.x = x;
    this.y = y;
};

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
};

var Tree = function(x, y) {
    this.sprite = 'images/tree-tall.png';
    this.x = x;
    this.y = y;
};

//Draw the rock on the screen
Tree.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);

// Draw boxes to figure out the 2D collisions detection
    // drawBox(this.x + 8, this.y + 70, 85, 85, "blue");

};

var allObstacles = [new Rock(200, 390), new Tree(305, 50), new Rock(405, 50), new Rock(205, 50), new Rock(105, 390)];

// ----------------------------------- Win ----------------------------------------

var WinGame = function(x, y) {
    this.sprite = 'images/chest-closed.png';
    this.x = 510;
    this.y = 70;
};

WinGame.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y, 91,135);
};

var winGame = new WinGame();

// ----------------------------------- Items ----------------------------------------

var Item = function(x, y, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.height = 10;
};

Item.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y, 61, 103);
};

var allItems = [new Item(20, 440, 'images/Key.png'), new Item(120, 115, 'images/Heart.png')];

//----------------------------------- Event listener ------------------------------

// Listen for key presses and sends the keys to the Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
