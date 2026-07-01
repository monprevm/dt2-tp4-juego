export class Preload extends Phaser.Scene {

    constructor() {
        super("Preload");
    }

    preload() {

        this.load.image(
            "bg",
            "./assets/sprites/bg.png"
        );

        this.load.spritesheet("npc", "./assets/sprites/npc.png", 
            {
            frameWidth: 64,   
            frameHeight: 64   
        }
        );


        this.load.spritesheet(
            "maquinista",
         "./assets/sprites/maquinista.png",
          { 
            frameWidth: 64, 
            frameHeight: 64 
        } 
        );

        this.load.image(
            "debris",
            "./assets/sprites/debris.png"
        );

        this.load.image(
            "suelo",
            "./assets/sprites/suelo.png"
        );

        this.load.spritesheet(
            "robot",
            "./assets/sprites/robot.png",
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