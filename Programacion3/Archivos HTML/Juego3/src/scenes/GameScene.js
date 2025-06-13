class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('balloon', 'assets/balloons.png');
    }

    create() {
        this.balloons = this.physics.add.group({
            key: 'balloon',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.balloons.children.iterate((balloon) => {
            balloon.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            balloon.setVelocity(Phaser.Math.Between(-200, 200), 20);
        });

        this.input.on('pointerdown', this.popBalloon, this);
    }

    update() {
        this.balloons.children.iterate((balloon) => {
            if (balloon.y > this.sys.game.config.height) {
                balloon.setY(0);
                balloon.setX(Phaser.Math.Between(0, this.sys.game.config.width));
            }
        });
    }

    popBalloon(pointer) {
        this.balloons.children.iterate((balloon) => {
            if (balloon.getBounds().contains(pointer.x, pointer.y)) {
                balloon.setAlpha(0); // Make the balloon disappear
                this.time.delayedCall(500, () => {
                    balloon.setAlpha(1); // Reset the balloon after a delay
                    balloon.setY(0);
                    balloon.setX(Phaser.Math.Between(0, this.sys.game.config.width));
                });
            }
        });
    }
}

export default GameScene;