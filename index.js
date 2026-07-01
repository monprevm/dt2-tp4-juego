import { Preload } from "./scenes/preload.js";
import { MainMenu } from "./scenes/mainmenu.js";
import { Nivel1 } from "./scenes/nivel1.js";
import { Nivel2 } from "./scenes/nivel2.js";
import { Nivel3 } from "./scenes/nivel3.js";
import { Retry } from "./scenes/retry.js";
import { Win } from "./scenes/Win.js";

const config = {

    type: Phaser.AUTO,

    width: 600,
    height: 400,

    scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
},

    physics: {

        default: "arcade",

        arcade: {

            gravity: { y: 300 },

            debug: false

        }

    },

    scene: [
        Preload,
        MainMenu,
        Nivel1,
        Nivel2,
        Nivel3,
        Retry,
        Win
    ]

};

new Phaser.Game(config);