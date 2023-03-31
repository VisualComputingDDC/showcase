let img;

function preload() {
  img = loadImage('../../../../sketches/kinegram_animal.jpg');
}

function setup() {
  createCanvas(550, 300);
}

function draw() {
  strokeWeight(5);
  background(255);
  image(img, 0, -50, 500, 400);
  
  let c = 0
  while (c < 500) {
    line(c + mouseX - 250, 20, c + mouseX - 250, 270)
    c += 9
  }
}