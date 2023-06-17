let pg;
let myShader;
let sides = 3;

function preload() {
  truchetShader = readShader('../../../../sketches/shader2.frag')
}

function setup() {
  createCanvas(550, 400, WEBGL);
  
  pg = createGraphics(550, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  
  pg.shader(truchetShader);
  
  pg.emitResolution(truchetShader);
  
  truchetShader.setUniform('u_zoom', 3);
  
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  
  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  box(300);
}

function mouseMoved() {
  truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}