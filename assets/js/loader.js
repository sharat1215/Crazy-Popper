let progressDiv = document.querySelector(".progress");

let assetArray = [
    { key: 'background', value: "./assets/images/popperBackground.jpg" },
    { key: 'popperBlue', value: "./assets/images/popperBlue.png" },
    { key: 'popperPurple', value: "./assets/images/popperPurple.png" },
    { key: 'popperYellow', value: "./assets/images/popperYellow.png" },
    { key: 'popperExplosion', value: "./assets/images/popperExplosion.png" },
    { key: 'popperLeftEye', value: "./assets/images/popperLeftEye.png" },
    { key: 'popperRightEye', value: "./assets/images/popperRightEye.png" },
    { key: 'projectile', value: "./assets/images/projectile.png" },
    { key: 'swap', value: "./assets/images/swap.png" },
    { key: 'level', value: "./assets/images/level.jpg" },
    { key: 'positions', value: "./assets/json/popperposition.json" },
    { key: 'next', value: "./assets/images/next.png" },
    { key: 'backgroundAudio', value: "./assets/audio/poppersBackgroundMusic.mp3" },
    { key: 'pop', value: "./assets/audio/pop3.mp3" },
    { key: 'awh', value: "./assets/audio/awh.mp3" },
    { key: 'applause', value: "./assets/audio/applauseShort.mp3" },



];

let loader = PIXI.loader;

for (let item of assetArray) {
    loader.add(item.key, item.value);
}

loader.on("progress", onProgress);

function onProgress(event) {

    progressDiv.innerText = Math.floor(event.progress);

}

loader.load(setup);

function setup() {

    progressDiv.style.display = "none";
    gameSetup();
    init();

}

