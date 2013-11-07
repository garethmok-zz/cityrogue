Lost.namespace('Entity');

Lost.Entity.Enemy = function (x, y) {
    var frames = [[25, 45], [26, 46], [27, 47], [28, 48], [29, 49]];
    var rndIdx = Math.floor(Math.random() * frames.length);
    Lost.Entity.Entity.call(this, x, y, 'creatures', frames[rndIdx]);
};

Lost.Entity.Enemy.prototype = new Lost.Entity.Entity();
Lost.Entity.Enemy.prototype.constructor = Lost.Entity.Enemy;

Lost.Entity.Enemy.prototype.takeTurn = function () {
    if (!this.attacking) {
        var dirs = ["up", "down", "left", "right"];
        var dirIdx = Math.floor(Math.random() * dirs.length);
        var iterations = 0;
        while (iterations < 20 && this.checkCollision(dirs[dirIdx])) {
            dirIdx = Math.floor(Math.random() * dirs.length);
            iterations++;
        }
        this.move(dirs[dirIdx]);
    }
    
    Lost.Entity.Entity.prototype.takeTurn.call(this);
};

Lost.Entity.Enemy.prototype.move = function (dir) {
    var occupied = false;
    var occupier = null;
    for (var i = 0; i < Lost.Entities.length && !occupied; i++) {
        switch (dir) {
            case "up":
                if (Lost.Entities[i].x == this.x &&
                    Lost.Entities[i].y == this.y - 1) {
                    occupied = true;
                }
                break;
            case "down":
                if (Lost.Entities[i].x == this.x &&
                    Lost.Entities[i].y == this.y + 1) {
                    occupied = true;
                }
                break;
            case "left":
                if (Lost.Entities[i].y == this.y &&
                    Lost.Entities[i].x == this.x - 1) {
                    occupied = true;
                }
                break;
            case "right":
                if (Lost.Entities[i].y == this.y &&
                    Lost.Entities[i].x == this.x + 1) {
                    occupied = true;
                }
                break;
        }
        occupier = Lost.Entities[i];
    }

    if (occupied) {
        if (occupier instanceof Lost.Entity.Player) {
            occupier.addCommand(Lost.Command.takeDamage(10), 0);
            this.attacking = true;
        }
    } else {
        Lost.Entity.Entity.prototype.move.call(this, dir);
    }
};