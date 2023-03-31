function setup() {
  createCanvas(335, 400);
}

function draw() {  
  background(255);
  
  strokeWeight(4);
  let c1 = 0
  while (c1 < 300) {
    line(20, c1 + 150, 270, c1 + 150)
    c1 += 7
  }
  
  strokeWeight(3);
  let c2 = 0
  while (c2 < 300) {
    line(60, c2 + mouseY - 150, 310, c2 + mouseY - 150)
    c2 += 6
  }
}