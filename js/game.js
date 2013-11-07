var player, map, tileset, bglayer, itemlayer, cursors;

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'main', {preload: preload, create: create, update: update});

Lost.Game = game;

function preload () {
    game.load.tilemap('map1', 'maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tileset('tiles', 'images/oryx_16bit_fantasy_world.png', Lost.Config.tileSize, Lost.Config.tileSize);
    game.load.spritesheet('creatures', 'images/oryx_16bit_fantasy_creatures_trans.png', Lost.Config.tileSize, Lost.Config.tileSize);
}

function create () {
    Lost.Map = game.add.tilemap('map1');
    tileset = game.add.tileset('tiles');

    bglayer = game.add.tilemapLayer(0, 0, 640, 480, tileset, Lost.Map, 0);
    bglayer.resizeWorld();

    Lost.CollisionLayer = game.add.tilemapLayer(0, 0, 640, 480, tileset, Lost.Map, 1);

    Lost.Player = new Lost.Entity.Player();

    var enemy = new Lost.Entity.Enemy(24, 24);

    game.camera.follow(Lost.Player.sprite);

    cursors = game.input.keyboard.createCursorKeys();
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