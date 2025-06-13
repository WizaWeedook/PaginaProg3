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
    this.load.image('meteorito', 'assets/meteorito.png');
    this.load.image('nave', 'assets/nave.png');
    // Si tienes un sprite para el taladro, descomenta la siguiente línea:
    // this.load.image('taladro', 'assets/taladro.png');
}

function create() {
    // Crear nave
    this.nave = this.physics.add.sprite(400, 500, 'nave');
    this.nave.setCollideWorldBounds(true);

    // Crear taladro (opcional, si tienes sprite)
    // this.taladro = this.physics.add.sprite(this.nave.x, this.nave.y - 40, 'taladro');
    // this.taladro.setScale(0.5);
    // this.taladro.body.allowGravity = false;

    // Grupo de meteoritos
    this.meteoritos = this.physics.add.group({
        key: 'meteorito',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.meteoritos.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Input para mover la nave
    this.cursors = this.input.keyboard.createCursorKeys();

    // Destruir meteorito con click (puedes cambiarlo por colisión con el taladro)
    this.input.on('pointerdown', function (pointer) {
        const meteorito = this.meteoritos.getChildren().find(m => m.getBounds().contains(pointer.x, pointer.y));
        if (meteorito) {
            meteorito.destroy();
        }
    }, this);
}

function update() {
    // Movimiento de la nave
    const speed = 250;
    this.nave.setVelocity(0);

    if (this.cursors.left.isDown) {
        this.nave.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
        this.nave.setVelocityX(speed);
    }
    if (this.cursors.up.isDown) {
        this.nave.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
        this.nave.setVelocityY(speed);
    }

    // Reposicionar meteoritos si salen de pantalla
    this.meteoritos.children.iterate(function (child) {
        if (child.y > 600) {
            child.setY(0);
        }
    });
}