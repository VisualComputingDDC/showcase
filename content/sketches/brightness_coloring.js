let inp1, inp2;
let Shader;

function setup() {
  createCanvas(800, 800, WEBGL);
  background('grey');

  inp1 = createColorPicker(color('blue'));
  inp1.position(150, 20);
  inp1.size(100, 50);
  inp1.input(setShade1);

  inp2 = createColorPicker(color('yellow'));
  inp2.position(550, 20);
  inp2.size(100, 50);
  inp2.input(setShade2);

  colored_slider = createSlider(0, 1, 0.5, 0.01); // min, max, default value, step
  colored_slider.position(300, 0);
  colored_slider.style('width', '200px');
  colored_slider.style('height', '80px');

  Shader = createShader(vertShader, fragShader);
}

function draw() {
  
  beginShape(QUADS);
    vertex(-400, -400);
    vertex(-400, 400);
    vertex(400, 400);
    vertex(400, -400);
  endShape(CLOSE);
  
  let commonShade = lerpColor(inp1.color(), inp2.color(), colored_slider.value());
  let brightnessValue = colored_slider.value(); // Valor de brillo de 0.0 a 1.0

  // Modulación del color resultante por el valor de brillo
  commonShade.levels[0] *= brightnessValue;
  commonShade.levels[1] *= brightnessValue;
  commonShade.levels[2] *= brightnessValue;
  
  Shader.setUniform('uMaterial1', colorToVec4(inp1.color()));
  Shader.setUniform('uMaterial2', colorToVec4(inp2.color()));
  Shader.setUniform('uSliderValue', colored_slider.value());
  Shader.setUniform('uBrightnessValue', brightnessValue);
  
  shader(Shader);
}

function setShade1() {
  console.log('You are choosing shade 1 to be:', this.value());
}

function setShade2() {
  console.log('You are choosing shade 2 to be:', this.value());
}

function colorToVec4(c) {
  return [red(c) / 255, green(c) / 255, blue(c) / 255, alpha(c) / 255];
}

const vertShader = `
attribute vec3 aPosition;

void main() {
  gl_Position = vec4(aPosition, 1.0);
}
`;

const fragShader = `
precision mediump float;

uniform vec4 uMaterial1;
uniform vec4 uMaterial2;
uniform float uSliderValue;
uniform float uBrightnessValue;

void main() {
  vec4 commonShade = mix(uMaterial1, uMaterial2, uSliderValue);
  commonShade *= uBrightnessValue;
  gl_FragColor = commonShade;
}
`;
