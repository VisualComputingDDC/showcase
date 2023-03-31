let spacing = 7;
let angle = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  stroke(0);
  strokeWeight(0.75);
  
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      let d = dist(x, y, width/2, height/2);
      let offset = map(d, 0, dist(0, 0, width/2, height/2), -angle, angle);
      line(x - offset, y + offset, x - offset, y - offset);
      line(x + offset, y + offset, x + offset, y - offset);
    }
  }
  
  if (angle > 70) {
    angle = 0
  }
  
  angle += 0.05;
}