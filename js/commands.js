Lost.namespace('Command');

Lost.Command.moveUp = {
    execute: function (unit) {
        if (!unit.checkCollision("up")) {
            unit.y -= 1;
        }        
    }
};

Lost.Command.moveDown = {
    execute: function (unit) {
        if (!unit.checkCollision("down")) {
            unit.y += 1;
        }
    }
};

Lost.Command.moveLeft = {
    execute: function (unit) {
        if (!unit.checkCollision("left")) {
            unit.x -= 1;
        }
    }
}

Lost.Command.moveRight = {
    execute: function (unit) {
        if (!unit.checkCollision("right")) {
            unit.x += 1;
        }
    }
}

Lost.Command.takeDamage = function (damage) {
    return {
        execute: function(unit) {
            unit.hp -= damage;
            unit.attacking = true;
            console.log("HP: " + unit.hp);
        }
    }
}