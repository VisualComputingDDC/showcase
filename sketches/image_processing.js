let img;
let myShader;
let edge;
let originalShader;
let magnifier;
let blur;
let emboss;

function preload() {
   myShader = readShader('../../../../sketches/myShader2.frag', 
                         {varyings: Tree.texcoords2});
  
  video_src = createVideo(['../../../../sketches/video.webm']);
  video_src.hide();
  
  img_src = loadImage('../../../../sketches/image2.jpg');
  src = img_src;
}

function setup() {
  createCanvas(550, 300, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(myShader);
  
  myShader.setUniform('mask', [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0])
  
  emitResolution(myShader);
  
  video_on = createCheckbox('Video', false);
  video_on.style('color', 'white');
  video_on.changed(() => {
    src = video_on.checked() ? video_src : img_src;
    video_on.checked() ? video_src.loop() : video_src.pause();
  });
  video_on.position(420, 10);
  
  emitTexOffset(myShader, src, [uniform = 'texOffset']);
  
  edge = createCheckbox('Edge detection', false);
  edge.position(420, 30);
  edge.style('color', 'white');
  edge.input(() => edge.checked() ? myShader.setUniform('mask', [-1.0, -1.0, -1.0, -1.0, 8.0, -1.0, -1.0, -1.0, -1.0]) : myShader.setUniform('mask', [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0]));
  
  emboss = createCheckbox('Emboss', false);
  emboss.position(420, 50);
  emboss.style('color', 'white');
  emboss.input(() => emboss.checked() ? myShader.setUniform('mask', [-2.0, -1.0,  0.0, -1.0,  1.0,  1.0,  0.0,  1.0,  2.0]
) : myShader.setUniform('mask', [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0]));
  
  blur = createCheckbox('Blur', false);
  blur.position(420, 70);
  blur.style('color', 'white');
  blur.input(() => {blur.checked() ? myShader.setUniform('mask5', [1.0/256.0, 4.0/256.0, 6.0/256.0, 4.0/256.0, 1.0/256.0,
 4.0/256.0, 16.0/256.0, 24.0/256.0, 16.0/256.0, 4.0/256.0,
 6.0/256.0, 24.0/256.0, 48.0/256.0, 24.0/256.0, 6.0/256.0,
 4.0/256.0, 16.0/256.0, 24.0/256.0, 16.0/256.0, 4.0/256.0,
 1.0/256.0, 4.0/256.0, 6.0/256.0, 4.0/256.0, 1.0/256.0]
) : myShader.setUniform('mask', [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0]);
                    myShader.setUniform('blur', blur.checked())});
  
  magnifier = createCheckbox('Magnifier', false);
  magnifier.position(420, 90);
  magnifier.style('color', 'white');
  magnifier.changed(() => { myShader.setUniform('magnifier', magnifier.checked());
  magnifier.checked() ? myShader.setUniform('edge', false) : myShader.setUniform('edge', edge.checked());
                          });
}

function draw() {
  myShader.setUniform('texture', src);
  emitMousePosition(myShader)
  beginShape();
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}