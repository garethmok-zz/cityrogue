Lost.namespace('Entity');

Lost.Entity.Player = function () {
    Lost.Entity.Entity.call(this, 2, 2, 'creatures', [24, 44]);
    this.hp = 100;
};

Lost.Entity.Player.prototype = new Lost.Entity.Entity();
Lost.Entity.Player.prototype.constructor = Lost.Entity.Player;

Lost.Entity.Player.prototype.move = function (dir) {
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
        if (occupier instanceof Lost.Entity.Enemy) {
            occupier.addCommand(Lost.Command.takeDamage(10), 0);
        }
    } else {
        Lost.Entity.Entity.prototype.move.call(this, dir);
    }
};

