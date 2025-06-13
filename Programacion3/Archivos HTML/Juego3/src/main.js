const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('balloon', 'assets/balloons.png');
}

function create() {
    this.balloons = this.physics.add.group({
        key: 'balloon',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.balloons.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.input.on('pointerdown', function (pointer) {
        const balloon = this.balloons.getChildren().find(b => b.getBounds().contains(pointer.x, pointer.y));
        if (balloon) {
            balloon.destroy();
        }
    }, this);
}

function update() {
    this.balloons.children.iterate(function (child) {
        if (child.y > 600) {
            child.setY(0);
        }
    });
}