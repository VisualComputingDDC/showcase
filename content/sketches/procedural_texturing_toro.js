let pg;
let sides = 3;
let myShader;

function preload() {
  myShader = readShader('../../../../sketches/shader1.frag');
}

function setup() {
  createCanvas(550, 400, WEBGL);
  
  pg = createGraphics(550, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  
  detailX = createSlider(3, 24, 3);
  detailX.position(10, height + 5);
  detailX.style('width', '80px');
  
  pg.shader(myShader);
  
  pg.emitResolution(myShader);
  
  myShader.setUniform('u_zoom', 3);
  
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  
  texture(pg);
}

function draw() {  
  background(33);
  orbitControl();
  torus(150, 80, detailX.value(), 12);
}

function mouseMoved() {
  myShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1)
}
