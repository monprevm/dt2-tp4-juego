export class Retry extends Phaser.Scene {

    constructor() {
        super("Retry");
    }

    create() {

        const score = this.registry.get("scoreTotal") || 0;
        const saved = this.registry.get("savedTotal") || 0;

        this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000
        ).setAlpha(0.85);

        const cx = this.cameras.main.centerX;

        this.add.text(cx, 80, "GAME OVER", {
            fontSize: "48px",
            color: "#ff3333",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.text(cx, 170, "Puntaje final: " + score, {
            fontSize: "28px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.add.text(cx, 215, "NPCs salvados: " + saved, {
            fontSize: "24px",
            color: "#aaffaa"
        }).setOrigin(0.5);

        const btnReiniciar = this.add.text(cx, 300, "🔄  REINICIAR", {
            fontSize: "30px",
            color: "#ffffff",
            backgroundColor: "#333333",
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btnReiniciar.on("pointerover", () => btnReiniciar.setStyle({ color: "#ffff00" }));
        btnReiniciar.on("pointerout",  () => btnReiniciar.setStyle({ color: "#ffffff" }));
        btnReiniciar.on("pointerdown", () => {
            this.registry.set("scoreTotal", 0);
            this.registry.set("savedTotal", 0);
            this.scene.start("Nivel1");
        });

        const btnMenu = this.add.text(cx, 370, "MENÚ PRINCIPAL", {
            fontSize: "30px",
            color: "#ffffff",
            backgroundColor: "#333333",
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btnMenu.on("pointerover", () => btnMenu.setStyle({ color: "#ffff00" }));
        btnMenu.on("pointerout",  () => btnMenu.setStyle({ color: "#ffffff" }));
        btnMenu.on("pointerdown", () => {
            this.registry.set("scoreTotal", 0);
            this.registry.set("savedTotal", 0);
            this.scene.start("MainMenu");
        });
    }
}