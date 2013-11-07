Lost.namespace('Entity');

Lost.Entity.Enemy = function (x, y) {
    Lost.Entity.Entity.call(this, x, y, 'creatures', [25, 45]);
};

Lost.Entity.Enemy.prototype = new Lost.Entity.Entity();
Lost.Entity.Enemy.prototype.constructor = Lost.Entity.Enemy;