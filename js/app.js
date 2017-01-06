
// Drew boxes to figure out the 2D collisions detection
// function drawBox(x, y, width, height, color) {
//     ctx.beginPath();
//     ctx.rect(x, y, width, height);
//     ctx.lineWidth = 2;
//     ctx.strokeStyle = color;
//     ctx.stroke();
// }

// -------------------- Enemies our player must avoid -------------------------------
//Create my Enemy class
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
// Draw boxes to figure out the 2D collisions detection
    // drawBox(this.x, this.y + 76 , 100, 67, "yellow");
};

var allEnemies = [new Enemy(-430, 310, 50), new Enemy(-150, 310, 75), new Enemy(-100, 140, 100), new Enemy(-100, 140, 50), new Enemy(-100, 225, 25), new Enemy(-100, 225, 75)];


// ----------------------------------- Player ----------------------------------------

//Create my Player class
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
//Check if there is a collision between the player and the obstacles (rocks or trees)
    this.checkCollisionsObstacles();
//Check if there is a collision between the player and the key
    this.checkCollisionsKeys();
//Check if there is a collision between the player and the heart
    this.checkCollisionsHearts();

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

//Save position of the player before it moves again
Player.prototype.savePreviousPosition = function() {
    previousX = this.x;
    previousY = this.y;
};

//Make player move up/down/right/left depending on the key pressed
Player.prototype.handleInput = function(key) {
    this.savePreviousPosition();
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

//Check if Player collided with a bug
Player.prototype.checkCollisionsBugs = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        var enemy = allEnemies[i];
        if (enemy.x < (this.x + 8) + this.width &&
        enemy.x + enemy.width > (this.x + 8) &&
        (enemy.y + 76) < (this.y + 60) + this.height &&
        enemy.height + (enemy.y + 76) > (this.y + 60)) {
            this.reset();
            ctx.clearRect(0,0,110,50);
            allLife.splice(allLife.length - 1, 1);
        }
    }
};

//Check if Player collided with an obstacle
Player.prototype.checkCollisionsObstacles = function() {
    for (var i = 0; i < allObstacles.length; i++) {
        var obstacle = allObstacles[i];
        if ((obstacle.x - 1) < (this.x + 8) + this.width &&
        (obstacle.x - 1) + obstacle.width > (this.x + 8) &&
        (obstacle.y + 77) < (this.y + 60) + this.height &&
        obstacle.height + (obstacle.y + 77) > (this.y + 60)) {
            this.backPreviousPosition();
        }
    }
};

//Check if Player collided with a key
Player.prototype.checkCollisionsKeys = function() {
    for (var i = 0; i < allKeys.length; i++) {
        var key = allKeys[i];
        if ((key.x + 4) < (this.x + 8) + this.width &&
        (key.x + 4) + key.width > (this.x + 8) &&
        (key.y + 30) < (this.y + 60) + this.height &&
        key.height + (key.y + 30) > (this.y + 60)) {
            allKeys.splice(i, 1);
        }
    }
};

//Check if Player collided with a heart
Player.prototype.checkCollisionsHearts = function() {
    for (var i = 0; i < allHearts.length; i++) {
        var heart = allHearts[i];
        if ((heart.x + 4) < (this.x + 8) + this.width &&
        (heart.x + 4) + heart.width > (this.x + 8) &&
        (heart.y + 30) < (this.y + 60) + this.height &&
        heart.height + (heart.y + 30) > (this.y + 60)) {
            if (allLife.length === 2) {
                allHearts.splice(i, 1);
                allLife.push(new Life(80, 0));
            }
            if (allLife.length === 1) { 
                allHearts.splice(i, 1);
                allLife.push(new Life(40, 0));
            }

        }
    }
};

var player = new Player();

Player.prototype.reset = function() {
    this.x = 300;
    this.y = 400;
};

//Restore the previous position of the Player
Player.prototype.backPreviousPosition = function() {
    this.x = previousX;
    this.y = previousY;
};

// ----------------------------------- Obstacles : Rock & Trees & Bushes----------------------------------------
//Create my Rock class
var Rock = function(x, y) {
    this.sprite = 'images/Rock.png';
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 83;
};

//Draw the rock on the screen
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
// Draw boxes to figure out the 2D collisions detection
    // drawBox(this.x - 1, this.y + 77, 101, 83, "green");

};

//Create my Tree class
var Tree = function(x, y) {
    this.sprite = 'images/tree-tall.png';
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 83;
};

//Draw the tree on the screen
Tree.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
// Draw boxes to figure out the 2D collisions detection
    // drawBox(this.x - 1, this.y + 77, 101, 83, "blue");
};

var allObstacles = [new Rock(200, 390), new Tree(305, 55), new Rock(405, 55), new Rock(205, 55), new Rock(105, 390)];

// ----------------------------------- Chest ----------------------------------------

//Create my Chest class
var Chest = function(x, y) {
    this.sprite = 'images/chest-closed.png';
    this.x = 510;
    this.y = 70;
};

//Draw the chest on the screen
Chest.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y, 91,135);
};

var chest = new Chest();

// ----------------------------------- Items ----------------------------------------

//Create my Item class for the key and the heart
var Key = function(x, y) {
    this.sprite = 'images/Key.png';
    this.x = x;
    this.y = y;
    this.height = 53;
    this.width = 57;
};

//Draw the items (key, heart) on the screen
Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y, 61, 103);
// Draw boxes to figure out the 2D collisions detection
    // drawBox(this.x + 4, this.y + 30, 53, 57, "purple");
};

var allKeys = [new Key(20, 445)];

var Heart = function(x, y) {
    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = y;
    this.height = 53;
    this.width = 57;
};

//Draw the items (key, heart) on the screen
Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y, 61, 103);
// Draw boxes to figure out the 2D collisions detection
    // drawBox(this.x + 4, this.y + 30, 53, 57, "purple");

};

var allHearts = [new Heart(120, 115)];

var keyCollected = [];
//----------------------------------- Life counter -------------------------------

var Life = function(x, y) {
    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = y;
}

//Draw the items (key, heart) on the screen
Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y, 30, 50);
};

var allLife = [new Life(0, 0), new Life(40, 0), new Life(80, 0)];

//----------------------------------- Game Over -----------------------------------

var GameOver = function() {
    this.x = 0;
    this.y = 0;
}

GameOver.prototype.render = function() {
        if (allLife.length === 0) {
            ctx.fillStyle = "#222";
            ctx.fillRect(0, 0, 700, 700);
            ctx.fillStyle = "white";
            ctx.font = "60px Comic Sans MS";
            ctx.fillText("Game Over", 150, 300);
        }
    };

var gameOver = new GameOver();

//----------------------------------- Winner -----------------------------------

var WinningGame = function() {
    this.x = 0;
    this.y = 0;
}

WinningGame.prototype.render = function() {
        if (keyCollected.length === 1 && player.x === 500 && player.y === 76) {
            ctx.fillStyle = "#222";
            ctx.fillRect(0, 0, 700, 700);
            ctx.fillStyle = "white";
            ctx.font = "60px Comic Sans MS";
            ctx.fillText("Congratulations ! You've open the treasure chest.", 150, 300);
        }
    };

var winningGame = new WinningGame();

//----------------------------------- Event listener ------------------------------

// Listen for key presses and sends the keys to the Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'start'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
