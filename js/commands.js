Lost.namespace('Command');

Lost.Command.moveUp = {
    execute: function (unit) {
        if (!unit.checkCollision("up")) {
            unit.sprite.y -= Lost.Config.tileSize;
        }        
    }
};

Lost.Command.moveDown = {
    execute: function (unit) {
        if (!unit.checkCollision("down")) {
            unit.sprite.y += Lost.Config.tileSize;
        }
    }
};

Lost.Command.moveLeft = {
    execute: function (unit) {
        if (!unit.checkCollision("left")) {
            unit.sprite.x -= Lost.Config.tileSize;
        }
    }
}

Lost.Command.moveRight = {
    execute: function (unit) {
        if (!unit.checkCollision("right")) {
            unit.sprite.x += Lost.Config.tileSize;
        }
    }
}

Lost.Command.takeDamage = function (damage) {
    return {
        execute: function(unit) {
            unit.hp -= damage;
        }
    }
}

Lost.Command.moveRandom = {
    execute: function (unit) {
        var dirs = ["up", "down", "left", "right"];
        var dirIdx = Math.floor(Math.random() * dirs.length);
        var iterations = 0;
        while (iterations < 20 && unit.checkCollision(dirs[dirIdx])) {
            dirIdx = Math.floor(Math.random() * dirs.length);
            iterations++;
        }

        switch(dirs[dirIdx]) {
            case "up":
                Lost.Command.moveUp.execute(unit);
                break;
            case "down":
                Lost.Command.moveDown.execute(unit);
                break;
            case "left":
                Lost.Command.moveLeft.execute(unit);
                break;
            case "right":
                Lost.Command.moveRight.execute(unit);
                break;
        }
    }
}