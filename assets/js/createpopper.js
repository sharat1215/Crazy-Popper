let isGameOver = false;
function popperCreate(popperColor) {
    isGameOver = false;
    let popperPurple = new PIXI.Sprite(loader.resources[popperColor].texture);
    let popperLeftEye = new PIXI.Sprite(loader.resources["popperLeftEye"].texture);
    let popperRightEye = new PIXI.Sprite(loader.resources["popperRightEye"].texture);

    popperPurple.anchor.set(0.5);
    popperPurple.scale.set(3);
    popperLeftEye.anchor.set(0.5);
    popperRightEye.anchor.set(0.5);

    popperLeftEye.position.x = -15;
    popperLeftEye.position.y = -10;

    popperRightEye.position.x = 5;
    popperRightEye.position.y = -10;

    animationEyes(popperLeftEye, popperRightEye);

    popperPurple.addChild(popperLeftEye, popperRightEye);


    return popperPurple;
}

function onPopperClicked() {
    totalTap--;
    tap.text = "Tap " + totalTap;
    explodePopper(this);


}

function explodePopper(popper) {
    let index = popperArray.indexOf(popper);
    popper.clickRequired--;
    pop.play();
   
    
    switch (popper.clickRequired) {
        case 0:
            createProjectile(popper);
            popper.children = [];
            popperArray.splice(index, 1);
            popper.texture = loader.resources['popperExplosion'].texture;
            let explosion = new TWEEN.Tween(popper.scale)
                .to({ x: 0, y: 0 }, 1000)
                .easing(TWEEN.Easing.Bounce.In)
                .onComplete(() => {

                    popper.destroy();
                })
                .start();
            break;
        case 1:
            popper.texture = loader.resources['popperPurple'].texture;
            break;

        case 2:
            popper.texture = loader.resources['popperBlue'].texture;
            break;
    }
    if (popperArray.length == 0 && totalTap >= 0) {
            gameWon(popper.parent);
    }
 
}

function gameWon(container) {
    let gameWonContainer = new PIXI.Container();
    let popup = new PIXI.Graphics();
    popup.beginFill(0xDE3249);
    popup.drawRect(50, 50, 600, 300);
    popup.endFill();
    applause.play();
    let levelComplete = new PIXI.Text("LEVEL COMPLETED" , { fontSize: 50, fontWeight: 'bold' });
    levelComplete.position.set(popup.width - 250, 100);
    levelComplete.anchor.set(0.5);

    let restart = new PIXI.Sprite(loader.resources["swap"].texture);
    restart.interactive = true;
    restart.buttonMode = true;
    restart.scale.set(1.5);
    restart.position.set(popup.x + restart.width, popup.height - restart.height)
    restart.on('pointerdown', restartGame);

    let next = new PIXI.Sprite(loader.resources["next"].texture);

    next.interactive = true;
    next.buttonMode = true;

    next.on('pointerdown', gotoNextLevel);
    next.scale.set(0.3);
    next.position.set(popup.width - next.width, popup.height - next.height);

    popup.addChild(levelComplete);

    if(currentLevel !== totalLevel){
        popup.addChild(next);
        popup.addChild(restart);
        
    }else{
        restart.position.set(popup.width / 2, popup.height - 50);
        levelComplete.text = "All Level Completed";
    }
    gameWonContainer.addChild(popup);
    container.addChild(gameWonContainer);
    gameWonContainer.position.set((container.width/2) - gameWonContainer.width/2 , 
    (container.height/2) - gameWonContainer.height/2);

}

function gameOver(container){
    let gameOverContainer = new PIXI.Container();
    let popup = new PIXI.Graphics();
    popup.beginFill(0xDE3249);
    popup.drawRect(50, 50, 600, 300);
    popup.endFill();
    awh.play();
    let gameOverText = new PIXI.Text("Game Over" , { fontSize: 50, fontWeight: 'bold' });
    gameOverText.position.set(popup.width - 250, 100);
    gameOverText.anchor.set(0.5);

    let restart = new PIXI.Sprite(loader.resources["swap"].texture);
    restart.interactive = true;
    restart.buttonMode = true;
    restart.scale.set(1.5);
    restart.position.set(popup.x + restart.width, popup.height - restart.height)
    restart.on('pointerdown', restartGame);
    
    popup.addChild(gameOverText);
    popup.addChild(restart);
    
    gameOverContainer.addChild(popup);
    container.addChild(gameOverContainer);
    gameOverContainer.position.set((container.width/2) - gameOverContainer.width/2 , 
    (container.height/2) - gameOverContainer.height/2);

}
function restartGame()
{    
    mainContainer.destroy();
    startGame();
}

function gotoNextLevel(){
    mainContainer.destroy();
    currentLevel++;
    levelContainer.visible = true;
    enableNextLevel(levelArray, currentLevel);
}
function animationEyes(eye1, eye2) {
    let tween1 = new TWEEN.Tween(eye1.scale)
        .to({ x: 1.2, y: 1.2 }, 500)
        .repeat(Infinity)
        .yoyo(true)
        .easing(TWEEN.Easing.Linear.None)
        .start();

    let tween2 = new TWEEN.Tween(eye2.scale)
        .to({ x: 1.2, y: 1.2 }, 500)
        .delay(300)
        .easing(TWEEN.Easing.Linear.None)
        .repeat(Infinity)
        .yoyo(true)
        .start();
}