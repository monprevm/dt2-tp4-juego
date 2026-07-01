export class MainMenu extends Phaser.Scene {

    constructor() {
        super("MainMenu");
    }

    create() {

        const bg = this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            "bg"
        ).setDisplaySize(
            this.cameras.main.width,
            this.cameras.main.height
        );

        const rt = this.add.renderTexture(0, 0,
            this.cameras.main.width,
            this.cameras.main.height
        );
        rt.draw(bg, this.cameras.main.centerX, this.cameras.main.centerY);
        rt.setAlpha(0); 

        this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000
        ).setAlpha(0.45);

        const cx = this.cameras.main.centerX;
        const cy = this.cameras.main.centerY;

        this.add.text(cx, cy - 80, "¡CUIDADO CON LOS BALDES!", {
            fontSize: "36px",
            color: "#ffffff",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 6
        }).setOrigin(0.5);

        const btnJugar = this.add.text(cx, cy + 20, "JUGAR", {
            fontSize: "32px",
            color: "#ffffff",
            backgroundColor: "#1a1a2e",
            padding: { x: 30, y: 12 },
            stroke: "#000000",
            strokeThickness: 4
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btnJugar.on("pointerover", () => {
            btnJugar.setStyle({ color: "#ffdd00" });
        });
        btnJugar.on("pointerout", () => {
            btnJugar.setStyle({ color: "#ffffff" });
        });
        btnJugar.on("pointerdown", () => {
            this.scene.start("Nivel1");
        });
    }
}
