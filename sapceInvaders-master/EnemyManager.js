class EnemyManager {
    constructor() {
        const gap = 15;                         //utrymmet mellan fiender
        for(let y = 0; y < 5; y++) {            //vertikala kolumner
            for(let x = 0; x < 11; x++) {       //horisontella rader
                enemies.push(new Enemy(x * entity.w + (gap * x) + entity.w, y * entity.h + (gap * y) + entity.h,));
            }
        }
        this.enemies = enemies;
    }

    shoot(temp) {
        if(temp == 150) {
            updateTick = 0;
            let temp = RNG(enemies.length);     //väljer en slumpmässig fiende
            projectiles.push(new Projectile(enemies[temp].x + entity.w / 2 - projectile.w / 2, enemies[temp].y, 1));
        }
    }

    move() {
        for(let i = 0; i < this.enemies.length; i++) {
            if(this.enemies[i].x + entity.w >= screenSize) {        //kollar om någon fiende har nått höger sida av skärmen
                for(let j = 0; j < this.enemies.length; j++) {
                    this.enemies[j].y += 15;                        //flyttar ner med 15px
                }
                movingLeft = true;
            }
            if(this.enemies[i].x <= 0) {                            //kollar om någon fiende har nått vänster sida av skärmen
                for(let j = 0; j < this.enemies.length; j++) {
                    this.enemies[j].y += 15;                        //flyttar ner med 15px
                }
                movingLeft = false;
            }
            if(movingLeft) {
                this.enemies[i].x -= updateSpeed;
            }
            else {
                this.enemies[i].x += updateSpeed;
            }
        }
    }

    display() {
        for(let i = 0; i < this.enemies.length; i++) {
            image(imgEnemy, this.enemies[i].x, this.enemies[i].y, entity.w, entity.h);
        }
    }
}