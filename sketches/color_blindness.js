let capture;

function setup() {
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0, 640, 480);

  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];
    let a = pixels[i + 3];

    // apply color mapping algorithm
    let color = mapColor(r, g, b);

    pixels[i] = color.r;
    pixels[i + 1] = color.g;
    pixels[i + 2] = color.b;
    pixels[i + 3] = a;
  }
  updatePixels();
}

function mapColor(r, g, b) {
  // apply color mapping algorithm here
  // return an object with r, g, b properties
  // representing the mapped color
  return {r: r, g: g, b: b};
}

function mapColor(r, g, b) {
  // simulate deuteranopia (green-blindness)
  let r2 = 0.625 * r + 0.375 * g + 0.0 * b;
  let g2 = 0.7 * r + 0.3 * g + 0.0 * b;
  let b2 = 0.0 * r + 0.3 * g + 0.7 * b;

  // normalize colors to the range [0, 255]
  let maxVal = max(r2, g2, b2);
  if (maxVal > 255) {
    r2 = 255 * r2 / maxVal;
    g2 = 255 * g2 / maxVal;
    b2 = 255 * b2 / maxVal;
  }

  return {r: r2, g: g2, b: b2};
}