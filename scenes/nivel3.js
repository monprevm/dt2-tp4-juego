export class Nivel3 extends Phaser.Scene {

    constructor() {
        super("Nivel3");
    }

    create() {

        this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            "bg"
        ).setDisplaySize(
            this.cameras.main.width,
            this.cameras.main.height
        );

        this.score = this.registry.get("scoreTotal") || 0;
        this.saved = 0;    
        this.goal = 7;
        this.vidas = 3;
        this.invulnerable = false;
        this.npcMuerto = false;
        this.npcGuardado = false;
        this.npcOffsets = { A: 0, B: 3, C: 6 };
        this.maquinistaInvulnerable = false;
        this.maquinistaCooldown = false;

        this.add.text(20, 20, "Nivel 3");
        this.scoreText = this.add.text(20, 50, "Puntos: " + this.score, { fontSize: "24px" });
        this.savedText = this.add.text(20, 80, "Salvados: 0 / 7");
        this.vidasText = this.add.text(20, 110, "Vidas: " + this.vidas, { fontSize: "24px" });

        // Jugador
        this.player = this.physics.add.sprite(400, 300, "robot");
        this.facing = "right";
        this.player.setFrame(4);

        // npc
        const tipos = ["A", "B", "C"];
        this.npcTipo = Phaser.Math.RND.pick(tipos);
        this.npc = this.physics.add.sprite(200, 300, "npc");
        this.npc.setFrame(this.npcOffsets[this.npcTipo] + 0);

        // Maquinista
        this.maquinista = this.physics.add.sprite(-50, 300, "maquinista");
        this.maquinista.setFrame(0);
        this.maquinista.body.setSize(20, 36);
        this.maquinista.body.setOffset(22, 24);
        this.maquinistaVivo = true;
        this.maquinistaActivo = false;
        this.time.delayedCall(3000, () => {
            this.maquinistaActivo = true;
        });

        // Zona segura
        this.safeZone = this.add.rectangle(700, 300, 100, 600, 0x00ff00);
        this.physics.add.existing(this.safeZone, true);

        // Debris
        this.debrisGroup = this.physics.add.group();
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnDebris,
            callbackScope: this,
            loop: true
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        this.upKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.UP
        );

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 380, "suelo");
        this.physics.world.setBounds(0, 0, 600, 400);
        this.physics.world.setBoundsCollision(true, false, true, true);
        this.player.setCollideWorldBounds(true);
        this.npc.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.npc, this.platforms);
        this.physics.add.collider(this.maquinista, this.platforms);

        this.physics.add.overlap(
            this.npc, this.safeZone,
            this.saveNPC, null, this
        );
        this.physics.add.overlap(
            this.debrisGroup, this.player,
            this.hitPlayer, null, this
        );
        this.physics.add.overlap(
            this.debrisGroup, this.npc,
            this.hitNPC, null, this
        );
        this.physics.add.overlap(
            this.maquinista, this.player,
            this.hitPlayerMaquinista, null, this
        );
    }

    update() {

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.setFrame(1);
            this.facing = "left";
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.setFrame(3);
            this.facing = "right";
        }
        else {
            this.player.setVelocityX(0);
            if (this.facing === "left") {
                this.player.setFrame(0);
            } else if (this.facing === "right") {
                this.player.setFrame(4);
            } else {
                this.player.setFrame(2);
            }
        }

        if (
            Phaser.Input.Keyboard.JustDown(this.upKey) &&
            this.player.body.blocked.down
        ) {
            this.player.setVelocityY(-250);
        }

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            if (this.facing === "left") {
                this.player.setFrame(5);
            } else {
                this.player.setFrame(6);
            }

            this.kickNPC();

            this.time.delayedCall(200, () => {
                if (this.facing === "left") {
                    this.player.setFrame(0);
                } else {
                    this.player.setFrame(4);
                }
            });
        }

        // Maquinista
        if (this.maquinistaVivo) {
            if (!this.maquinistaActivo) {
                this.maquinista.setVelocityX(60);
                this.maquinista.setFrame(1);
            } else {
                const dx = this.player.x - this.maquinista.x;
                if (dx > 5) {
                    this.maquinista.setVelocityX(60);
                    this.maquinista.setFrame(2);
                } else if (dx < -5) {
                    this.maquinista.setVelocityX(-60);
                    this.maquinista.setFrame(1);
                } else {
                    this.maquinista.setVelocityX(0);
                    this.maquinista.setFrame(0);
                }
            }
        }
    }

    kickNPC() {
        if (this.npcMuerto) return;

        const distNPC = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.npc.x, this.npc.y
        );

        if (distNPC < 80) {
            this.npc.setVelocityX(this.facing === "left" ? -300 : 300);
            this.npc.setFrame(this.npcOffsets[this.npcTipo] + 1);
            this.time.delayedCall(400, () => {
                if (!this.npcMuerto) {
                    this.npc.setFrame(this.npcOffsets[this.npcTipo] + 0);
                }
            });
        }

        if (this.maquinistaVivo) {
            const distMaq = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                this.maquinista.x, this.maquinista.y
            );

            if (distMaq < 80) {
                this.maquinista.setVelocityX(this.facing === "left" ? -150 : 150);
                this.maquinistaInvulnerable = true;
                this.time.delayedCall(600, () => {
                    this.maquinistaInvulnerable = false;
                });
            }
        }
    }

    spawnDebris() {
        const x = Phaser.Math.Between(50, 550);

        const aviso = this.add.text(x, 20, "⚠️", {
            fontSize: "24px"
        }).setOrigin(0.5);

        this.time.delayedCall(1000, () => {
            aviso.destroy();
            const debris = this.debrisGroup.create(x, 0, "debris");
            debris.body.setSize(12, 12);
            debris.body.setOffset(2, 2);
            debris.setVelocityY(Phaser.Math.Between(150, 300));
            debris.setBounce(0.3);
            debris.setCollideWorldBounds(false);
        });
    }

    resetNPC() {
        const tipos = ["A", "B", "C"];
        this.npcTipo = Phaser.Math.RND.pick(tipos);
        this.npcMuerto = false;
        this.npcGuardado = false;
        this.npc.setPosition(200, 300);
        this.npc.setVelocity(0, 0);
        this.npc.setFrame(this.npcOffsets[this.npcTipo] + 0);
        this.npc.body.enable = false;
        this.time.delayedCall(100, () => {
            this.npc.body.enable = true;
        });
    }

    saveNPC() {
        if (this.npcMuerto || this.npcGuardado) return;
        this.npcGuardado = true;

        this.saved += 1;
        this.score += 100;
        this.scoreText.setText("Puntos: " + this.score);
        this.savedText.setText("Salvados: " + this.saved + " / " + this.goal);

        if (this.saved >= this.goal) {
            this.registry.set("scoreTotal", this.score);
            const prevSaved = this.registry.get("savedTotal") || 0;
            this.registry.set("savedTotal", prevSaved + this.saved);
            this.scene.start("Win");
            return;
        }

        this.resetNPC();
    }

    hitPlayer(player, debris) {
        if (this.invulnerable) return;

        debris.destroy();
        this.vidas -= 1;
        this.vidasText.setText("Vidas: " + this.vidas);

        if (this.vidas <= 0) {
            this.registry.set("scoreTotal", this.score);
            const prevSaved = this.registry.get("savedTotal") || 0;
            this.registry.set("savedTotal", prevSaved + this.saved);
            this.scene.start("Retry");
            return;
        }

        this.invulnerable = true;
        this.tweens.add({
            targets: this.player,
            alpha: 0,
            duration: 150,
            yoyo: true,
            repeat: 4
        });

        this.time.delayedCall(1500, () => {
            this.invulnerable = false;
            this.player.setAlpha(1);
        });
    }

    hitPlayerMaquinista() {
        if (this.invulnerable || this.maquinistaCooldown) return;

        this.maquinistaCooldown = true;
        this.vidas -= 1;
        this.vidasText.setText("Vidas: " + this.vidas);

        if (this.vidas <= 0) {
            this.registry.set("scoreTotal", this.score);
            const prevSaved = this.registry.get("savedTotal") || 0;
            this.registry.set("savedTotal", prevSaved + this.saved);
            this.scene.start("Retry");
            return;
        }

        this.invulnerable = true;
        this.tweens.add({
            targets: this.player,
            alpha: 0,
            duration: 150,
            yoyo: true,
            repeat: 4
        });

        this.time.delayedCall(1500, () => {
            this.invulnerable = false;
            this.player.setAlpha(1);
        });

        this.time.delayedCall(2000, () => {
            this.maquinistaCooldown = false;
        });
    }

    hitNPC() {
        if (this.npcMuerto) return;

        this.npc.setFrame(this.npcOffsets[this.npcTipo] + 1);

        this.time.delayedCall(500, () => {
            this.npcMuerto = true;
            this.npc.setFrame(this.npcOffsets[this.npcTipo] + 2);
            this.npc.body.enable = false;

            this.score -= 50;
            if (this.score < 0) this.score = 0;
            this.scoreText.setText("Puntos: " + this.score);

            this.time.delayedCall(2000, () => {
                this.resetNPC();
            });
        });
    }
}