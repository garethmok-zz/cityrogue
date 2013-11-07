Lost.namespace('World');

Lost.World.Map = function (tilemap, tileset, bgLayer, collisionLayer) {
    this.map = Lost.Game.add.tilemap(tilemap);
    this.tileset = Lost.Game.add.tileset(tileset);

    this.bglayer = Lost.Game.add.tilemapLayer(0, 0, 640, 480, this.tileset, this.map, bgLayer);
    this.bglayer.resizeWorld();

    this.collisionLayer = Lost.Game.add.tilemapLayer(0, 0, 640, 480, this.tileset, this.map, collisionLayer);
};