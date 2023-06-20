let blurShader;
let img;

function preload() {
  img = loadImage('../../../../sketches/myImage.jpg');
  blurShader = loadShader('../../../../sketches/convolution.vert', '../../../../sketches/convolution.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  shader(blurShader);
  blurShader.setUniform('tex0', img);
  blurShader.setUniform('texelSize', [1.0 / img.width, 1.0 / img.height]);
  blurShader.setUniform('kernel', [
    1, 1, 1,
    1, 1, 1,
    1, 1, 1
  ]);
  blurShader.setUniform('kernelWeight', 9.0);
  rect(0, 0, width, height);
}
