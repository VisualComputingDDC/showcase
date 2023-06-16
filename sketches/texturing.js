let myShader;
let src;
let img_src;
let video_src;
let video_on;
let value;
let lightness;
let uv;

function preload() {
  myShader = readShader('../../../../sketches/myShader.frag', 
                         {varyings: Tree.texcoords2});
  
  video_src = createVideo(['../../../../sketches/video.webm']);
  video_src.hide();
  
  img_src = loadImage('../../../../sketches/image.jpg');
  src = img_src;
}

function setup() {
  createCanvas(675, 400, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(myShader);
  video_on = createCheckbox('video', false);
  video_on.style('color', 'white');
  video_on.changed(() => {
    src = video_on.checked() ? video_src : img_src;
    video_on.checked() ? video_src.loop() : video_src.pause();
  });
  video_on.position(10, 10);
  value = createCheckbox('HSV value V', false);
  value.position(10, 30);
  value.style('color', 'white');
  value.input(() => myShader.setUniform('value', value.checked()));
  lightness = createCheckbox('HSL lightness L', false);
  lightness.position(10, 50);
  lightness.style('color', 'white');
  lightness.input(() => myShader.setUniform('lightness', lightness.checked()));
  uv = createCheckbox('uv visualization', false);
  uv.style('color', 'white');
  uv.changed(() => myShader.setUniform('uv', uv.checked()));
  uv.position(10, 70);
}

function draw() {
  myShader.setUniform('texture', src);
  beginShape();
  
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}