Lost.namespace('CityRogue');
var cursors;

Lost.Game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'main', {preload: preload, create: create, update: update});

function preload () {
    Lost.Game.load.tilemap('map1', 'maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    Lost.Game.load.tileset('tiles', 'images/oryx_16bit_fantasy_world.png', Lost.Config.tileSize, Lost.Config.tileSize);
    Lost.Game.load.spritesheet('creatures', 'images/oryx_16bit_fantasy_creatures_trans.png', Lost.Config.tileSize, Lost.Config.tileSize);
}

function create () {
    Lost.CityRogue.Map = new Lost.World.Map('map1', 'tiles');

    Lost.Player = new Lost.Entity.Player();
    Lost.Game.camera.follow(Lost.Player.sprite);

    var enemies = [new Lost.Entity.Enemy(9, 5),
                    new Lost.Entity.Enemy(19, 5),
                    new Lost.Entity.Enemy(9, 15),
                    new Lost.Entity.Enemy(19, 15),
                    new Lost.Entity.Enemy(9, 24)];

    cursors = Lost.Game.input.keyboard.createCursorKeys();
    Lost.CityRogue.Map.bglayer.events.onInputDown.add(touchInput, this);
}

var takeTurn = false;
var animating = false;

function touchInput() {
    var map = Lost.CityRogue.Map.bglayer;
    var x = map.getTileX(map.input._tempPoint.x);
    var y = map.getTileY(map.input._tempPoint.y);

    if (Lost.Player.x == x && Lost.Player.y - 1 == y) {
        takeTurn = true;
        Lost.Player.move('up');
    } else if (Lost.Player.x == x && Lost.Player.y + 1 == y) {
        takeTurn = true;
        Lost.Player.move('down');
    } else if (Lost.Player.x + 1 == x && Lost.Player.y == y) {
        takeTurn = true;
        Lost.Player.move('right');
    } else if (Lost.Player.x - 1 == x && Lost.Player.y == y) {
        takeTurn = true;
        Lost.Player.move('left');
    }
}

function update () {
    if (!animating && cursors.up.isDown)
    {
        keyHeld = true;
        takeTurn = true;
        Lost.Player.move('up');
    }
    else if (!animating && cursors.down.isDown)
    {
        keyHeld = true;
        takeTurn = true;
        Lost.Player.move('down');
    }
    else if (!animating && cursors.left.isDown)
    {
        keyHeld = true;
        takeTurn = true;
        Lost.Player.move('left');
    }
    else if (!animating && cursors.right.isDown)
    {
        keyHeld = true;
        takeTurn = true;
        Lost.Player.move('right');
    }

    var destroyed = [];

    var thisPassAnimating = false;

    for (var i = 0; i < Lost.Entities.length; i++) {
        if (takeTurn) {
            Lost.Entities[i].takeTurn();
        }

        Lost.Entities[i].update();

        if (takeTurn && Lost.Entities[i].destroyed) {
            destroyed.push(Lost.Entities[i]);
        }

        if (Lost.Entities[i].animating) {
            thisPassAnimating = true;
        }
    }

    animating = thisPassAnimating;

    if (takeTurn) {
        for (i = 0; i < destroyed.length; i++) {
            Lost.Entities.splice(Lost.Entities.indexOf(destroyed[i]), 1);
            destroyed[i] = null;
        }
    }    

    destroyed = null;
    takeTurn = false;
}