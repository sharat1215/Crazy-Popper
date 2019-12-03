let game;

function gameSetup() {


    let gameSettings = {

        width: 1920,
        height: 1080,
        antialias: true,
        transparent: false,
        resolution: 1,
        forceCanvas: true


    };

    game = new PIXI.Application(gameSettings);
    document.body.appendChild(game.view);

    window.addEventListener("resize", canvasResize);
    canvasResize();

}

function canvasResize() {

    let ratio = game.renderer.width / game.renderer.height;
    

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let newWidth;
    let newHeight;

    if (windowWidth / windowHeight >= ratio) {

        newWidth = windowHeight * ratio;
        newHeight = windowHeight;

    }
    else {

        newWidth = windowWidth;
        newHeight = windowWidth / ratio;

    }
   

    game.view.style.width = `${newWidth}px`;
    game.view.style.height = `${newHeight}px`;

}