class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame") // scene name
    }

    preload() {
        this.load.image("background", "assets/images/background.png")
        this.load.spritesheet("ship", "assets/spritesheets/ship.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.image("ship2", "assets/images/ship2.png")
        this.load.image("ship3", "assets/images/ship3.png")
        this.load.spritesheet("explosion", "assets/spritesheets/explosion.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("power-up", "assets/spritesheets/power-up.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("player", "assets/spritesheets/player.png", {
            frameWidth: 16,
            frameHeight: 24
        })
    }

    create() {
        this.add.text(20, 20, "Loading game...")

        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship"),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: false
        })

        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 0,
                end: 1
            }),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 2,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: "thrust",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1
        })
        this.scene.start("playGame")
    }
}