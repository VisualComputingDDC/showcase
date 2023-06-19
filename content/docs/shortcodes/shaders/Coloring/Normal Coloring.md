# Normal Coloring

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

    In the setup() function, a canvas is created with a size of 800x800 pixels and set to use   WebGL. Color picker elements are created using createColorPicker(), allowing the user to  select colors for blending. A slider is also created to control the blending factor. The     shader program is initialized using createShader() and provided with the vertex and fragment    shader code.

{{< details "draw()" open >}}
```javascript
function draw() {
  background(220);
  
  beginShape(QUADS);
    vertex(-400, -400);
    vertex(-400, 400);
    vertex(400, 400);
    vertex(400, -400);
  endShape(CLOSE);

  Shader.setUniform('uMaterial1', colorToVec4(inp1.color()));
  Shader.setUniform('uMaterial2', colorToVec4(inp2.color()));
  Shader.setUniform('uSliderValue', colored_slider.value());
  
  shader(Shader);
}
```
{{< /details >}}

* draw()

    The draw() function is called repeatedly and handles the rendering process. First, the  background is set to gray using the background() function. Then, a square shape is drawn using   the beginShape() and endShape() functions to serve as the canvas for the shader effects.
    The uniform variables in the shader program are set using the Shader.setUniform() method. The   uMaterial1 uniform represents the color selected by inp1, uMaterial2 represents the color     selected by inp2, and uSliderValue represents the blending factor controlled by the slider.
    The shader() function is called to apply the shader program, which activates the custom color   blending algorithm defined in the fragment shader.

{{< details "setShade1() and setShade2()" open >}}
```javascript
function setShade1() {
  console.log('You are choosing shade 1 to be:', this.value());
  fill(inp1.color());
}

function setShade2() {
  console.log('You are choosing shade 2 to be:', this.value());
  fill(inp2.color());
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

    The vertex shader code (vertShader) simply sets the position of each vertex in the mesh.

{{< details "fragShader" open >}}
```javascript
const fragShader = `
precision mediump float;

uniform vec4 uMaterial1;
uniform vec4 uMaterial2;
uniform float uSliderValue;

void main() {
  vec4 commonShade = mix(uMaterial1, uMaterial2, uSliderValue);
  gl_FragColor = commonShade;
}
`;
```
{{< /details >}}

* fragment shader

    The fragment shader code (fragShader) sets the precision for floating-point calculations and    defines the uniform variables. The main() function performs the color blending operation using     the mix() function, which blends the two colors based on the uSliderValue uniform.

    In summary, this code sets up a canvas with color picker inputs and a slider to control color   blending. The shader program applies a custom color blending algorithm in the fragment shader,    which blends the selected colors based on the slider value. The resulting blended color is     displayed on the canvas.

{{< p5-iframe sketch="/showcase/sketches/normal_coloring.js" width="825" height="825" >}}


## 3. Conclusion
Blending colors is a fundamental concept in computer graphics and digital image processing. It involves combining or mixing two or more colors to create a new color or achieve various visual effects. Blending can be implemented using different algorithms and techniques, depending on the desired outcome. In the context of the provided code using shaders in P5.js, blending is achieved through a component-wise multiplication between the RGB components of the two colors. The code demonstrates how to create a canvas, use color pickers and a slider to control the blending, and apply a shader program to perform the blending operation. By understanding the principles of blending and leveraging the power of shaders, developers can create visually appealing and realistic effects in their digital projects.
