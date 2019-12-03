
let currentLevel = 1;
let levelContainer = null;

let levelArray = [];

let totalLevel = 5;
function init() {

    let backgroundTexture = loader.resources["background"].texture;
    let background = new PIXI.Sprite(backgroundTexture);
    background.width = game.renderer.width;
    background.height = game.renderer.height;

    game.stage.addChild(background);

    levelContainer = new PIXI.Container();
    game.stage.addChild(levelContainer);


    let spaceBetween = 10;
    let startFrom = 150;
    for (let i = 0; i < totalLevel; i++) {
        let level = new PIXI.Sprite(loader.resources["level"].texture);
        level.scale.set(0.7);
        level.position.set(startFrom + (level.width + spaceBetween) * i, 50);
        let levelNum = new PIXI.Text(("LEVEL " + (i + 1)), { fontSize: 80, fontWeight: 'bold' });
        levelNum.anchor.set(0.5);
        
        level.levelID = (i + 1);
        levelArray.push(level);
        level.on('touchend', startGame);
        level.on('mouseup', startGame);
        level.addChild(levelNum);
        level.anchor.set(0.5);
        level.alpha = 0.3;
        levelContainer.addChild(level);
    }

    let containerXPos = game.renderer.width / 2 - levelContainer.width / 2;
    let containerYPos = game.renderer.height / 2 - levelContainer.height / 2;
    levelContainer.position.set(containerXPos, containerYPos);

    enableNextLevel(levelArray, currentLevel);

}

function enableNextLevel(levelArray, currentLevel) {

    levelArray[currentLevel - 1].alpha = 1; 
    levelArray[currentLevel - 1].interactive = true; 
    levelArray[currentLevel - 1].buttonMode = true; 
}