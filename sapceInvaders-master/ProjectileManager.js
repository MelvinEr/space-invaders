class ProjectileManager {
    constructor() {
        projectiles = new Array();
    }

    move() {
        if(playerProjectiles.length > 0) {
            playerProjectiles[0].y -= 10;
        }
        for(let i = 0; i < projectiles.length; i++) {
            if(projectiles[i].d == 1) {
                projectiles[i].y += 6;
            }
        }
    }

    display() {
        if(playerProjectiles.length > 0) {
            image(imgLaser, playerProjectiles[0].x, playerProjectiles[0].y, projectile.w, projectile.h);
        }
        if(projectiles.length == 1) {
            for(let i = 0; i < projectiles.length; i++) {
                image(imgLaser, projectiles[i].x, projectiles[i].y, projectile.w, projectile.h);
            }
        }
    }

    checkCollision() {
        for(let i = 0; i < enemies.length && playerProjectiles.length > 0; i++) {               //loop som går igenom alla fiender
            if(playerProjectiles[0].y < 0) {                                                    //kollar om projektilen är ovanför skärmen
                playerProjectiles.pop();                                                        //tar isåfall bort den
            }
            else if(isIntersecting(playerProjectiles[0], enemies[i], entity, projectile)) {     //kollar om en projektil träffar en fiende
                playerProjectiles.pop();                                                        //tar isåfall bort den
                enemies.splice(i, 1);                                                           //tar bort träffade fienden
                updateSpeed *= 1.02;                                                            //ökar hastigheten på resterande fiender
                score++;
            }
        }
        if(projectiles.length > 0) {
            if(projectiles[0].y > screenSize) {                                                 //kollar om projektilen är under skärmen
                projectiles.pop();
            }
            else if(isIntersecting(projectiles[0], player, entity, projectile)) {               //kollar om spelaren blir träffad
                gameRunning = false;                                                            //avslutar isåfall spel-loopen
            }
        }
        for(let i = 0; i < enemies.length; i++) {                                               
            if(enemies[i].y + entity.h > screenSize) {                                          //kollar om en fiende har nått botten av skärmen
                gameRunning = false;                                                            //avslutar isåfall spel-loopen
            }
        }
    }
}