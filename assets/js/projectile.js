
function createProjectile(target, container) {

    let projectileArray = [];
    let speed = 15;
    for (let i = 0; i < 4; i++) {

        let projectileTexture = loader.resources["projectile"].texture;
        let projectile = new PIXI.Sprite(projectileTexture);
        projectile.anchor.set(0.5);
        projectile.scale.set(2);

        game.stage.addChild(projectile);
        projectile.isCollide = null;
        projectile.x = target.toGlobal(game.stage).x;
        projectile.y = target.toGlobal(game.stage).y;
        
        speed *= -1;

        if (i < 2) {

            projectile.xVelocity = speed;
            projectile.yVelocity = 0;
        } else {

            projectile.xVelocity = 0;
            projectile.yVelocity = speed;
        }
        projectileArray.push(projectile);


    }


    moveProjectile(projectileArray);


}

function moveProjectile(projectileArray) {
  game.ticker.add(() => {
        for (let projectile of projectileArray) {

            projectile.x += projectile.xVelocity;
            projectile.y += projectile.yVelocity;
            projectile.rotation += 0.5;
            checkForCollide(projectile);
            if (projectile.x < 0 || projectile.x > game.renderer.width || projectile.y < 0 || projectile.y > game.renderer.height) {
                let index = projectileArray.indexOf(projectile);
                projectileArray.splice(index, 1);
                projectile.destroy();

                
            }

            
            
        }

      
        
    })
}

function checkForCollide(projectile) {

    for (let popper of popperArray) {
        if (projectile.x + (projectile.width / 2) > popper.toGlobal(game.stage).x - (popper.width / 2)) {
            if (projectile.x - (projectile.width / 2) < popper.toGlobal(game.stage).x + (popper.width / 2)) {
                if (projectile.y + (projectile.height / 2) > popper.toGlobal(game.stage).y - (popper.height / 2)) {
                    if (projectile.y - (projectile.height / 2) < popper.toGlobal(game.stage).y + (popper.height / 2)) {
                        if (projectile.isCollide === null || !Object.is(projectile.isCollide, popper)) {
                            projectile.isCollide = popper;
                            explodePopper(popper)
                        }

                    }
                }
            }

        }

    }
    
}
function render() {
    TWEEN.update();

}