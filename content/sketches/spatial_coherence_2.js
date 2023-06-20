let myShader;
let img;

function preload() {
  img = loadImage('../../../../sketches/img1.jpg');
  myShader = loadShader('../../../../sketches/shader_2.vert', '../../../../sketches/shader.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  shader(myShader);
  myShader.setUniform('tex0', img);
}

function draw() {
  rect(0, 0, width, height);
}

