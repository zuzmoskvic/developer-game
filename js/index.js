
let bg;

function preload() {
    bg = loadImage("img/bg-withbanner.png");
}

function setup() {
    image(bg, 0, 0);
    canvas = createCanvas(1024, 710);
}

function draw() {
    image(bg,0, 0);
}


