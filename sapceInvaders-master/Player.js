class Player {
    constructor() {
        this.x = screenSize / 2;
        this.y = screenSize - entity.h;
    }
    
    move(v) {
        if(this.x < 0) {
            this.x++;
        }
        else if(this.x + entity.w > screenSize) {
            this.x--;
        }
        else {
            this.x += v;
        }
    }

    shoot() {
        if(playerProjectiles.length == 0) {
            playerProjectiles.push(new Projectile(player.x + entity.w / 2 - projectile.w / 2, player.y - entity.h, -1));
            laserSound.play();
        }
    }

    display() {
        image(imgShip, this.x, this.y, entity.w,  entity.h);
    }
}