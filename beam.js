class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        const x = scene.player.x + 8
        const y = scene.player.y
        super(scene, x, y, "beam")

        scene.add.existing(this) 
        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = - 250;

        scene.projectiles.add(this)
    }

    update() {
        if(this.y < 0) {
            this.destroy()
        }
    }
}