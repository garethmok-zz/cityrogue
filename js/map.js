Lost.namespace('World');

Lost.World.Map = function (tilemap, tileset) {
    this.map = Lost.Game.add.tilemap(tilemap);
    this.tileset = Lost.Game.add.tileset(tileset);

    this.bglayer = Lost.Game.add.tilemapLayer(0, 0, window.innerWidth, window.innerHeight, this.tileset, this.map, 0);
    this.shadowLayer = Lost.Game.add.tilemapLayer(0, 0, window.innerWidth, window.innerHeight, this.tileset, this.map, 1);
    this.collisionLayer = Lost.Game.add.tilemapLayer(0, 0, window.innerWidth, window.innerHeight, this.tileset, this.map, 2);
    this.openDoorLayer = Lost.Game.add.tilemapLayer(0, 0, window.innerWidth, window.innerHeight, this.tileset, this.map, 3);
    this.doorLayer = Lost.Game.add.tilemapLayer(0, 0, window.innerWidth, window.innerHeight, this.tileset, this.map, 4);

    this.bglayer.resizeWorld();
};

Lost.World.Map.prototype.redrawDoorLayer = function () {
    this.doorLayer.dirty = true;
    this.openDoorLayer.dirty = true;
}