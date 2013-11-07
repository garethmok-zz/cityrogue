Lost.namespace('Entity');

Lost.Entities = [];

Lost.Entity.Entity = function (x, y, image, frames) {
    if (x === undefined) { return; }
    this.commandQueue = [];

    this.sprite = Lost.Game.add.sprite(x, y, image);
    this.sprite.animations.add('walk', frames);
    this.sprite.animations.play('walk', 2, true);

    this.hp = 10;

    this.x = x;
    this.y = y;

    this.destroyed = false;

    Lost.Entities.push(this);
};

Lost.Entity.Entity.prototype.update = function () {
    if (this.hp <= 0) {
        this.sprite.kill();
        this.sprite.destroy();
        this.destroyed = true;
    }
};

Lost.Entity.Entity.prototype.takeTurn = function () {
    var commandsDone = [];
    for (var i = 0; i < this.commandQueue.length; i++) {
        var cmd = this.commandQueue[i];
        if (cmd.turnsUntil === 0) {
            cmd.command.execute(this);
            commandsDone.push(cmd);
        } else {
            this.commandQueue[i].turnsUntil -= 1;
        }
    }

    for (i = 0; i < commandsDone.length; i++) {
        this.commandQueue.splice(this.commandQueue.indexOf(commandsDone[i]), 1)
    }
};

Lost.Entity.Entity.prototype.move = function (dir) {
    switch (dir) {
        case "up":
            this.commandQueue.push({command: Lost.Command.moveUp, turnsUntil: 0});
            break;
        case "down":
            this.commandQueue.push({command: Lost.Command.moveDown, turnsUntil: 0});
            break;
        case "left":
            this.commandQueue.push({command: Lost.Command.moveLeft, turnsUntil: 0});
            break;
        case "right":
            this.commandQueue.push({command: Lost.Command.moveRight, turnsUntil: 0});
            break;
    }
};

Lost.Entity.Entity.prototype.addCommand = function (command, turnsUntil) {
    this.commandQueue.push({command: command, turnsUntil: turnsUntil});
};

Lost.Entity.Entity.prototype.checkCollision = function (dir) {
    switch (dir) {
        case "up":
            var x = Lost.CityRogue.Map.collisionLayer.getTileX(this.sprite.x);
            var y = Lost.CityRogue.Map.collisionLayer.getTileY(this.sprite.y - Lost.Config.tileSize);
            break;
        case "down":
            var x = Lost.CityRogue.Map.collisionLayer.getTileX(this.sprite.x);
            var y = Lost.CityRogue.Map.collisionLayer.getTileY(this.sprite.y + Lost.Config.tileSize);
            break;
        case "left":
            var x = Lost.CityRogue.Map.collisionLayer.getTileX(this.sprite.x - Lost.Config.tileSize);
            var y = Lost.CityRogue.Map.collisionLayer.getTileY(this.sprite.y);
            break;
        case "right":
            var x = Lost.CityRogue.Map.collisionLayer.getTileX(this.sprite.x + Lost.Config.tileSize);
            var y = Lost.CityRogue.Map.collisionLayer.getTileY(this.sprite.y);
            break;
    }

    return Lost.CityRogue.Map.collisionLayer.layer.data[y][x];
};