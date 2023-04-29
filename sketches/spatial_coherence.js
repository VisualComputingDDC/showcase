let video;
let scaleFactor = 16; // adjust this value to change the pixel size

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/scaleFactor, height/scaleFactor);
  video.hide();
}
function pixelate() {
  loadPixels();
  for (let y = 0; y < height; y += scaleFactor) {
    for (let x = 0; x < width; x += scaleFactor) {
      let index = 4 * (x + y * width);
      let r = pixels[index];
      let g = pixels[index + 1];
      let b = pixels[index + 2];
      let a = pixels[index + 3];
      for (let i = 0; i < scaleFactor; i++) {
        for (let j = 0; j < scaleFactor; j++) {
          let ii = i + x;
          let jj = j + y;
          let idx = 4 * (ii + jj * width);
          pixels[idx] = r;
          pixels[idx + 1] = g;
          pixels[idx + 2] = b;
          pixels[idx + 3] = a;
        }
      }
    }
  }
  updatePixels();
}
function draw() {
  image(video, 0, 0, width, height);
  pixelate();
}