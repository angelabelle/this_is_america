var ms;
var bullet;
var whiteLillies;
var blueHydrangea;
var pinkCarnation;
var rifleImage;
var shotgunImage;
var handgunImage;
let yearSlider;
let sel1, sel2;
var bulletIcon;
var blue = 'images/blueHydrangeaSmall.png';
var white = 'images/whiteLilliesSmall.png';
var pink = 'images/pinkCarnationSmall.png';
var flowerAmount = 200;
let type = [blue, white, pink];
let flower = [];
let flowerGroup;
let bulletGroup;



function preload() {
    // ms = loadJSON("ms2019.json");
    loadJSON("mass-shootings-in-america.json", "json", dloaded, dfail);
    bullet = loadImage('images/bulletHole.png');
    pinkRose = loadImage('images/pinkRose.png');
    whiteLillies = loadImage('images/whiteLillies.png');
    pinkCarnation = loadImage('images/pinkCarnation.png');
    blueHydrangea = loadImage('images/blueHydrangea.png');
    shotgunImage = loadImage('images/shotgun.png');
    handgunImage = loadImage('images/handgun.png');
    rifleImage = loadImage('images/rifle.png');
}

function dloaded(theData) {
    ms = theData;
    console.log(ms);
}

function dfail(theData) {
    console.error();
}

var mgr;

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    noStroke();
    mgr = new SceneManager();
    mgr.addScene(intro);
    mgr.addScene(help);
    mgr.addScene(main);
    mgr.showNextScene();
}

function draw() {
    background(255);
    mgr.draw();

    // textSize(100);
    // text(sliderVal, windowWidth/2, windowHeight/2);

}

function mousePressed() {
    mgr.mousePressed();


}

function nextScene() {

    if (mgr.isCurrent(help)) {
        mgr.showScene(main);
    } else {
        mgr.showScene(help);
    }

}

function keyPressed() {
    // You can optionaly handle the key press at global level...
    switch (key) {
        case '1':
            mgr.showScene(intro);
            break;
        case '2':
            mgr.showScene(main);
            break;
        case 'h':
            mgr.showScene(help);
            break;
        case 'space':
            mgr.showScene(main);
            break;

    }

    // ... then dispatch via the SceneManager.
    mgr.keyPressed();
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function button() {
    mgr.showScene(help);
}
