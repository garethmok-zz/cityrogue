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