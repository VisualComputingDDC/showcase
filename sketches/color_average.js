let video;
let pixelSize = 10;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width/pixelSize, height/pixelSize);
  video.hide();
}

function draw() {
  background(0);
  video.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index+1];
      let b = video.pixels[index+2];
      fill(r, g, b);
      noStroke();
      rect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
    }
  }
}

function keyPressed() {
  if (key == '+') {
    pixelSize += 5;
    video.size(width/pixelSize, height/pixelSize);
  } else if (key == '-') {
    pixelSize -= 5;
    video.size(width/pixelSize, height/pixelSize);
  }
}