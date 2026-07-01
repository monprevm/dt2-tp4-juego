export class Preload extends Phaser.Scene {

    constructor() {
        super("Preload");
    }

    preload() {

        this.load.image(
            "bg",
            "./assets/images/bg.png"
        );

        this.load.spritesheet("npc", "./assets/images/npc.png", 
            {
            frameWidth: 64,   
            frameHeight: 64   
        }
        );


        this.load.spritesheet(
            "maquinista",
         "./assets/images/maquinista.png",
          { 
            frameWidth: 64, 
            frameHeight: 64 
        } 
        );

        this.load.image(
            "bucket",
            "./assets/images/bucket.png"
        );

        this.load.image(
            "suelo",
            "./assets/images/suelo.png"
        );

        this.load.spritesheet(
            "player",
            "./assets/images/player.png",
            {
                frameWidth: 32,
                frameHeight: 48
            }
        );

    }

    create() {

        this.scene.start(
            "MainMenu"
        );

    }

}