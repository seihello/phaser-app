//import { Beam } from 'Beam.js'

class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame") // scene name
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background")
        this.background.setOrigin(0, 0)

        this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship")
        this.ship1.setScale(2)
        this.ship1.flipY = true


        this.ship1.play("ship1_anim")
        this.ship1.setInteractive()
        this.input.on("gameobjectdown", this.destroyShip, this)
        this.ship1.on("animationcomplete", this.restart, this)

        this.ship2 = this.add.image(config.width / 2, config.height / 2, "ship2")
        this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, "ship3")

        this.powerUps = this.physics.add.group()
        const maxObjects = 4
        for(let i = 0; i <= maxObjects; i++) {
            let powerUp = this.physics.add.sprite(16, 16, "power-up")
            this.powerUps.add(powerUp)
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height)

            if(Math.random() > 0.5) {
                powerUp.play("red")
            } else {
                powerUp.play("gray")
            }

            powerUp.setVelocity(100, 100)
            powerUp.setCollideWorldBounds(true)
            powerUp.setBounce(1.0)
        }

        this.player = this.physics.add.sprite(config.width/2-8, config.height-64, "player")
        this.player.setOrigin(0, 0)
        this.player.setCollideWorldBounds(true)
        this.player.play("thrust")

        this.cursorKeys = this.input.keyboard.createCursorKeys()
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.projectiles = this.add.group()
    }

    update() {
        this.ship1.angle += 3
        this.moveShip(this.ship1, 1)
        this.moveShip(this.ship2, 2)
        this.moveShip(this.ship3, 3)

        this.background.tilePositionY -= 0.5

        this.movePlayerManager()

        if(Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.shootBeam()
        }
        
        for(let i = 0; i < this.projectiles.getChildren().length; i++) {
            const beam = this.projectiles.getChildren()[i]
            beam.update()
        }
    }

    moveShip(ship, speed) {
        ship.y += speed

        if(ship.y > config.height) {
            this.resetShipPos(ship)
        }
    }

    resetShipPos(ship) {
        ship.y = 0
        const randomX = Phaser.Math.Between(0, config.width)
        ship.x = randomX
    }

    destroyShip(pointer, gameObject) {
        gameObject.setTexture("exlosion") 
        gameObject.play("explode")
    }

    restart() {
        this.ship1.play("ship1_anim")
    }

    movePlayerManager() {
        if(this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed)
        } else if(this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed)
        }

        if(this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-gameSettings.playerSpeed)
        } else if(this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed)
        }
    }

    shootBeam() {
        //const beam = this.physics.add.sprite(this.player.x, this.player.y, "beam")
        const beam = new Beam(this)
    }
}