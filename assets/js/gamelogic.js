let popperArray = [];
let totalTap;
let tap;
let mainContainer;
function startGame() {
    background.stop();
    background.play();
    let data = loader.resources['positions'].data;
    let level = this.levelID || currentLevel;
    let currentLevelData = data.positions['level_' + level];
    this.parent.visible = false;

    totalTap = currentLevelData.totalTap;
   
    
    mainContainer = new PIXI.Container();
    game.stage.addChild(mainContainer); 
    
    let levelInfo = new PIXI.Container();

    tap = new PIXI.Text("Tap " + totalTap, { fontSize: 80, fontWeight: 'bold' });
    
    tap.position.set(game.renderer.width - 500,0);
    tap.anchor.set(0.5);
    levelInfo.addChild(tap);
    

    let levelNum = new PIXI.Text("LEVEL " + level, { fontSize: 80, fontWeight: 'bold' });
    levelNum.position.set(game.renderer.width/2,0);
    levelNum.anchor.set(0.5);
    
    levelInfo.addChild(levelNum);
    mainContainer.addChild(levelInfo);


    
   

    
    
    for (let item of Object.keys(currentLevelData.poppers)) {

        let popper = popperCreate(currentLevelData.poppers[item].color);
        popper.position.set(currentLevelData.poppers[item].x, currentLevelData.poppers[item].y);
        popper.clickRequired = currentLevelData.poppers[item].clickRequired;
        mainContainer.addChild(popper);
        popper.buttonMode = true;
        popper.interactive = true;
        popper.on('pointerdown', onPopperClicked);
        popperArray.push(popper);

    }

    let containerXPos = game.renderer.width / 2 - mainContainer.width / 2;
    let containerYPos = game.renderer.height / 2 - mainContainer.height / 2;
    mainContainer.position.set(containerXPos, containerYPos);


    game.ticker.add(render);

}



