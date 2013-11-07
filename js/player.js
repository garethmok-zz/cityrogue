Lost.namespace('Entity');

Lost.Entity.Player = function () {
    Lost.Entity.Entity.call(this, 48, 48, 'creatures', [24, 44]);
};

Lost.Entity.Player.prototype = new Lost.Entity.Entity();
Lost.Entity.Player.prototype.constructor = Lost.Entity.Player;

Lost.Entity.Player.prototype.move = function (dir) {
    var occupied = false;
    var occupier = null;
    for (var i = 0; i < Lost.Entities.length && !occupied; i++) {
        switch (dir) {
            case "up":
                if (Lost.Entities[i].sprite.x == this.sprite.x &&
                    Lost.Entities[i].sprite.y == this.sprite.y - Lost.Config.tileSize) {
                    occupied = true;
                }
                break;
            case "down":
                if (Lost.Entities[i].sprite.x == this.sprite.x &&
                    Lost.Entities[i].sprite.y == this.sprite.y + Lost.Config.tileSize) {
                    occupied = true;
                }
                break;
            case "left":
                if (Lost.Entities[i].sprite.y == this.sprite.y &&
                    Lost.Entities[i].sprite.x == this.sprite.x - Lost.Config.tileSize) {
                    occupied = true;
                }
                break;
            case "right":
                if (Lost.Entities[i].sprite.y == this.sprite.y &&
                    Lost.Entities[i].sprite.x == this.sprite.x + Lost.Config.tileSize) {
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

