# Brightness Coloring

## 1. Introduction & Background
Blending refers to the process of combining or mixing two or more colors together to create a new color or visual effect. In computer graphics and digital image processing, blending is commonly used to achieve transparency, smooth transitions, and various visual effects.
In the context of color blending, it involves calculating the final color value by considering the contributions of multiple colors. The blending operation takes into account the colors being blended, their opacity or transparency values, and the blending mode or algorithm used.
Blending can occur between two or more colors, where each color contributes to the final result based on its intensity or weight. The blending process can involve mathematical operations such as interpolation, averaging, addition, subtraction, multiplication, or other complex algorithms, depending on the desired effect.
Blending is widely used in various applications, including computer graphics, image editing software, video editing, game development, and visual effects. It allows for the creation of smooth gradients, realistic shadows, translucent surfaces, fade-in/fade-out transitions, and many other visual enhancements that improve the overall aesthetics and realism of digital content.
Blending two colors refers to the process of combining two colors to create a new color that represents a mix of the original colors. In the context of this code, blending is achieved by performing a component-wise multiplication between the RGB components of the two colors.
Each color is represented by its red (R), green (G), and blue (B) components. By multiplying the corresponding components of the two colors together, we create a new color where each component is the product of the corresponding components from the original colors. This component-wise multiplication ensures that the resulting color retains the characteristics of both original colors.

In p5.js, blending can be implemented using shaders, which are programs that run on the GPU and can perform highly parallelized operations on images. A typical blending shader consists of a vertex shader and a fragment shader.
The vertex shader is responsible for transforming the input texture coordinates into output vertex positions. This shader is typically very simple and may not need to be modified for different blending effects.
The fragment shader is where the convolution operation is performed. This shader takes in the input image texture, a filter kernel, and the texture coordinates of the current pixel, and outputs the blended pixel value.


## 2. Code & results
The code demonstrates how to implement color blending using shaders in P5.js.

{{< details "variable declarations" open >}}
```javascript
let inp1, inp2;
let Shader;
```
{{< /details >}}

* Variable Declarations

    Variable Declarations: inp1: It stores the first createColorPicker. inp2: It stores the second  createColorPicker. Shader: It stores the shader program.

{{< details "setup()" open >}}
```javascript
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
```
{{< /details >}}

* setup()

    In the setup() function:
    A canvas is created with a size of 800x800 pixels and set to use WebGL.
    The background color of the canvas is set to gray.
    Two color picker elements are created using createColorPicker(), allowing the user to select     colors for blending. They are positioned on the canvas and their input events are linked to     the respective functions setShade1() and setShade2().
    A colored slider is created using createSlider(). It allows the user to control the blending     factor and is positioned on the canvas.

{{< details "draw()" open >}}
```javascript
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
```
{{< /details >}}

* draw()

    The draw() function:
    A square shape is drawn using the beginShape() and endShape() functions. This shape serves as   the canvas for the shader effects.
    The vertices of the square shape are defined, creating a centered square with a size of     800x800 pixels.
    The commonShade color is calculated using the lerpColor() function, which blends the colors     selected by inp1 and inp2 based on the value of the colored_slider.
    The brightnessValue is set to the value of the colored_slider.
    The red, green, and blue values of the commonShade color are multiplied by the  brightnessValue, modulating the resulting color based on the brightness value.
    The Shader program is created using createShader() and provided with the vertex and fragment    shader code.
    The uniform variables in the shader program are set using the Shader.setUniform() method. The   uMaterial1 uniform represents the color selected by inp1, the uMaterial2 uniform represents   the color selected by inp2, the uSliderValue uniform represents the blending factor controlled    by the slider, and the uBrightnessValue uniform represents the brightness value.
    The shader() function is called to apply the Shader program, which activates the custom color   blending algorithm defined in the fragment shader.
    Additional functions:

{{< details "setShade1() and setShade2()" open >}}
```javascript
function setShade1() {
  console.log('You are choosing shade 1 to be:', this.value());
}

function setShade2() {
  console.log('You are choosing shade 2 to be:', this.value());
}
```
{{< /details >}}

* setShade1() and setShade2()

    The setShade1() and setShade2() functions are called when the color picker inputs change. They  update the fill color to match the selected colors and log the selected values to the console.

{{< details "colorToVec4()" open >}}
```javascript
function colorToVec4(c) {
  return [red(c) / 255, green(c) / 255, blue(c) / 255, alpha(c) / 255];
}
```
{{< /details >}}

* colorToVec4()

    The colorToVec4() function converts the RGBA values of a color to a normalized vec4 array,  which is required for passing colors to the shader program.
    Vertex and fragment shader code:

{{< details "vertShader" open >}}
```javascript
const vertShader = `
attribute vec3 aPosition;

void main() {
  gl_Position = vec4(aPosition, 1.0);
}
`;
```
{{< /details >}}

* vertex shader

    The vertex shader code (vertShader) is responsible for transforming the input texture   coordinates into output vertex positions. It simply sets the position of each vertex in the   mesh.

{{< details "fragShader" open >}}
```javascript
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
```
{{< /details >}}

* fragment shader

    The fragment shader code (fragShader) sets the precision for floating-point calculations and    defines the uniform variables. The main() function performs the color blending operation using     the mix() function, which blends the two colors based on the uSliderValue uniform. The  resulting color is modulated by the uBrightnessValue uniform and assigned to gl_FragColor,   which represents the output color of the fragment.

    In summary, this code sets up a canvas with color picker inputs and a slider to control color   blending. It applies a shader program that performs custom color blending in the fragment     shader. The resulting blended color is displayed on the canvas.

{{< p5-iframe sketch="/showcase/sketches/brightness_coloring.js" width="825" height="825" >}}

## 3. Conclusion
Blending colors is a fundamental concept in computer graphics and digital image processing. It involves combining or mixing two or more colors to create a new color or achieve various visual effects. Blending can be implemented using different algorithms and techniques, depending on the desired outcome. In the context of the provided code using shaders in P5.js, blending is achieved through a component-wise multiplication between the RGB components of the two colors. The code demonstrates how to create a canvas, use color pickers and a slider to control the blending, and apply a shader program to perform the blending operation. By understanding the principles of blending and leveraging the power of shaders, developers can create visually appealing and realistic effects in their digital projects.
