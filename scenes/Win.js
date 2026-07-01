export class Win extends Phaser.Scene {

    constructor() {
        super("Win");
    }

    create() {
        const score = this.registry.get("scoreTotal") || 0;
        const saved = this.registry.get("savedTotal") || 0;

        this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000022
        ).setAlpha(0.9);

        const cx = this.cameras.main.centerX;

        this.add.text(cx, 70, "¡GANASTE!", {
            fontSize: "48px",
            color: "#ffdd00",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.text(cx, 160, "Puntaje final: " + score, {
            fontSize: "28px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.add.text(cx, 205, "NPCs salvados: " + saved, {
            fontSize: "24px",
            color: "#aaffaa"
        }).setOrigin(0.5);

        let mensaje = "";
        if (score >= 600) {
            mensaje = "¡Perfecto!";
        } else if (score >= 300) {
            mensaje = "Buen trabajo.";
        } else {
            mensaje = "La próxima vez lo harás mejor.";
        }

        this.add.text(cx, 260, mensaje, {
            fontSize: "22px",
            color: "#ccccff"
        }).setOrigin(0.5);

        const btnJugar = this.add.text(cx, 320, "JUGAR DE NUEVO", {
            fontSize: "28px",
            color: "#ffffff",
            backgroundColor: "#226622",
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btnJugar.on("pointerover", () => btnJugar.setStyle({ color: "#ffff00" }));
        btnJugar.on("pointerout",  () => btnJugar.setStyle({ color: "#ffffff" }));
        btnJugar.on("pointerdown", () => {
            this.registry.set("scoreTotal", 0);
            this.registry.set("savedTotal", 0);
            this.scene.start("Nivel1");
        });

        const btnMenu = this.add.text(cx, 375, "MENÚ PRINCIPAL", {
            fontSize: "28px",
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