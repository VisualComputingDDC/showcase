let img;
let tileSize = 10; // Size of each mosaic tile
let colorImages = []; // Array to store the color images
let Shader;

function preload() {
  // Load the image
  img = loadImage('../../../../images/vangogh.webp');
  // Load the color images
  colorImages[0] = loadImage('../../../../images/amarillo.webp');
  colorImages[1] = loadImage('../../../../images/azul_claro.webp');
  colorImages[2] = loadImage('../../../../images/azul_oscuro.jpg');
  colorImages[3] = loadImage('../../../../images/blanco.jpg');
  colorImages[4] = loadImage('../../../../images/cafe.webp');
  colorImages[5] = loadImage('../../../../images/gris.webp');
  colorImages[6] = loadImage('../../../../images/morado.jpg');
  colorImages[7] = loadImage('../../../../images/naranja.jpg');
  colorImages[8] = loadImage('../../../../images/negro.jpg');
  colorImages[9] = loadImage('../../../../images/rojo.jpg');
  colorImages[10] = loadImage('../../../../images/rosado.jpg');
  colorImages[11] = loadImage('../../../../images/verde.jpg');
}

function setup() {
  createCanvas(img.width, img.height, WEBGL);
  Shader = createShader(vertShader, fragShader);
  Shader.setUniform('uImage', img);
  Shader.setUniform('uTileSize', tileSize);
  Shader.setUniform('uColorCount', colorImages.length);
  for (let i = 0; i < colorImages.length; i++) {
    Shader.setUniform('uColorImages[' + i + ']', colorImages[i]);
  }
  noLoop(); // Only draw once
}

function draw() {

  shader(Shader);
  
}

const vertShader = `
precision highp float;
attribute vec3 aPosition;
varying vec2 vTexCoord;

void main() {
  vTexCoord = (aPosition.xy + 1.0) / 2.0;
  gl_Position = vec4(aPosition, 1.0);
}
`;

const fragShader = `
precision highp float;
varying vec2 vTexCoord;
uniform sampler2D uImage;
uniform float uTileSize;
uniform sampler2D uColorImages[12];
uniform int uColorCount;

vec4 getClosestColor(vec4 targetColor) {
  float closestDistance = 100000.0;
  vec4 closestColor;
  
  for (int i = 0; i < 12; i++) {
    if (i >= uColorCount) {
      break;
    }
    
    vec4 color = texture2D(uColorImages[i], vTexCoord);
    float distance = distance(color.rgb, targetColor.rgb);
    
    if (distance < closestDistance) {
      closestDistance = distance;
      closestColor = color;
    }
  }
  
  return closestColor;
}

void main() {
  vec2 uv = vTexCoord * 2.0 - 1.0;
  vec2 tileUV = floor(uv * uTileSize) / uTileSize;
  vec2 tileCenter = tileUV * 2.0 / uTileSize + 1.0 / uTileSize - 1.0;
  vec4 tileColor = texture2D(uImage, tileCenter);
  vec4 mosaicColor = getClosestColor(tileColor);
  
  gl_FragColor = mosaicColor;
}
`;