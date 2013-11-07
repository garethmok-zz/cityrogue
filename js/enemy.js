Lost.namespace('Entity');

Lost.Entity.Enemy = function (x, y) {
    var frames = [[25, 45], [26, 46], [27, 47], [28, 48], [29, 49]];
    var rndIdx = Math.floor(Math.random() * frames.length);
    Lost.Entity.Entity.call(this, x, y, 'creatures', frames[rndIdx]);
};

Lost.Entity.Enemy.prototype = new Lost.Entity.Entity();
Lost.Entity.Enemy.prototype.constructor = Lost.Entity.Enemy;

Lost.Entity.Enemy.prototype.takeTurn = function () {
    this.addCommand(Lost.Command.moveRandom, 0);
    Lost.Entity.Entity.prototype.takeTurn.call(this);
};