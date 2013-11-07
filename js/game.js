Lost.namespace('CityRogue');
var cursors;

Lost.Game = new Phaser.Game(640, 480, Phaser.AUTO, 'main', {preload: preload, create: create, update: update});

function preload () {
    Lost.Game.load.tilemap('map1', 'maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    Lost.Game.load.tileset('tiles', 'images/oryx_16bit_fantasy_world.png', Lost.Config.tileSize, Lost.Config.tileSize);
    Lost.Game.load.spritesheet('creatures', 'images/oryx_16bit_fantasy_creatures_trans.png', Lost.Config.tileSize, Lost.Config.tileSize);
}

function create () {
    Lost.CityRogue.Map = new Lost.World.Map('map1', 'tiles');

    Lost.Player = new Lost.Entity.Player();
    Lost.Game.camera.follow(Lost.Player.sprite);

    var enemies = [new Lost.Entity.Enemy(1, 1),
                    new Lost.Entity.Enemy(1, 2),
                    new Lost.Entity.Enemy(5, 1),
                    new Lost.Entity.Enemy(1, 5),
                    new Lost.Entity.Enemy(6, 6)];

    cursors = Lost.Game.input.keyboard.createCursorKeys();
}

var keyHeld = false;
var takeTurn = false;

function update () {
    if (cursors.up.isDown)
    {
        if (!keyHeld) {
            keyHeld = true;
            takeTurn = true;
            Lost.Player.move('up');
        }
    }
    else if (cursors.down.isDown)
    {
        if (!keyHeld) {
            keyHeld = true;
            takeTurn = true;
            Lost.Player.move('down');
        }
    }
    else if (cursors.left.isDown)
    {
        if (!keyHeld) {
            keyHeld = true;
            takeTurn = true;
            Lost.Player.move('left');
        }
    }
    else if (cursors.right.isDown)
    {
        if (!keyHeld) {
            keyHeld = true;
            takeTurn = true;
            Lost.Player.move('right');
        }
    } else {
        keyHeld = false;
    }

    if (takeTurn) {
        var destroyed = [];

        for (var i = 0; i < Lost.Entities.length; i++) {
            Lost.Entities[i].takeTurn();
            Lost.Entities[i].update();
            if (Lost.Entities[i].destroyed) {
                destroyed.push(Lost.Entities[i]);
            }
        }

        for (i = 0; i < destroyed.length; i++) {
            Lost.Entities.splice(Lost.Entities.indexOf(destroyed[i]), 1);
            destroyed[i] = null;
        }

        destroyed = null;
        takeTurn = false;
    }
}