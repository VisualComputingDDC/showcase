let diaMin = 20;
let diaMax = 550;
let diaStep = 6;

let angle = 0;

function setup() {
  createCanvas(550, 400);
  
  noFill()
  stroke(0)
  strokeWeight(diaStep/4)
}

function draw() {
  background(255);
  
  var xx = sin(radians(angle))*100;
  var yy = cos(radians(angle))*100;
  
  translate(width/2, height/2);
  for (var dia=diaMin; dia<diaMax; dia+=diaStep) {
    ellipse(-xx, yy, dia, dia);
    ellipse(xx, yy, dia, dia);
    ellipse(-xx, -yy, dia, dia);
    ellipse(xx, -yy, dia, dia);
  }
  angle = angle + 1;
}