# Image Processing

## 1. Introduction & Background
Digital image processing is the use of a digital computer to process digital images through an algorithm (Atalla & Kahng, n.d.). In webgl (i.e., GLSL ES) texturing is used to implement image processing (Charalambos, 2023). 

For this exercise, different effects were applied to an image and a video. Using image processing through texturing, and implementing convolutions to apply different masks or kernels.

Convolution is a general purpose filter effect for images. It is a matrix applied to an image and a mathematical operation composed of integers. It works by determining the value of a central pixel by adding the weighted values of all its neighbors together. The output is a new modified filtered image.

A kernel is a (usually) small matrix of numbers that is used in image convolutions (Ludwig, n.d.). 
* Differently sized kernels containing different patterns of numbers produce different results under convolution. 
* The size of a kernel is arbitrary but 3x3 is often used.

For this exercise, different kernels of differents sizes were used, to generate the next filters:
- Edge detection: Edge detection includes a variety of mathematical methods that aim at identifying edges, curves in a digital image at which the image brightness changes sharply or, more formally, has discontinuities (Edge Detection, n.d.).
- Emboss: The emboss kernel (similar to the sobel kernel and sometimes referred to mean the same) gives the illusion of depth by emphasizing the differences of pixels in a given direction (Powell, n.d.).
- Blur: The blur kernel de-emphasizes differences in adjacent pixel values.
- Magnifier: Magnification is the process of enlarging the apparent size, not physical size, of something (in this case, an image) (Magnification, n.d.).

There exist various applications of Image Processing, like facial expression recognition using thermal image processing, application of image processing to in-vitro human, matching of infrared and visual images, enhancement of satellite image, etc. (Carvalho, 2012)

## 2. Code & results
{{< details "setup()" open >}}
```javascript
function setup() {
  createCanvas(550, 300, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(myShader);
  
  myShader.setUniform('mask', [0.0, 0.0, 0.0, 
                               0.0, 1.0, 0.0,
                               0.0, 0.0, 0.0])
  
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
  edge.input(() => edge.checked() ? myShader.setUniform('mask', [-1.0, -1.0, -1.0, 
                                                                 -1.0, 8.0, -1.0, 
                                                                 -1.0, -1.0, -1.0]
                                ) : myShader.setUniform('mask', [0.0, 0.0, 0.0, 
                                                                 0.0, 1.0, 0.0, 
                                                                 0.0, 0.0, 0.0]));
  
  emboss = createCheckbox('Emboss', false);
  emboss.position(420, 50);
  emboss.style('color', 'white');
  emboss.input(() => emboss.checked() ? myShader.setUniform('mask', [-2.0, -1.0,  0.0, 
                                                                     -1.0,  1.0,  1.0, 
                                                                      0.0,  1.0,  2.0]
                                    ) : myShader.setUniform('mask', [0.0, 0.0, 0.0,
                                                                     0.0, 1.0, 0.0,
                                                                     0.0, 0.0, 0.0]));
  
  blur = createCheckbox('Blur', false);
  blur.position(420, 70);
  blur.style('color', 'white');
  blur.input(() => {blur.checked() ? myShader.setUniform('mask5', 
  [1.0/256.0, 4.0/256.0, 6.0/256.0, 4.0/256.0, 1.0/256.0,
   4.0/256.0, 16.0/256.0, 24.0/256.0, 16.0/256.0, 4.0/256.0,
   6.0/256.0, 24.0/256.0, 48.0/256.0, 24.0/256.0, 6.0/256.0,
   4.0/256.0, 16.0/256.0, 24.0/256.0, 16.0/256.0, 4.0/256.0,
   1.0/256.0, 4.0/256.0, 6.0/256.0, 4.0/256.0, 1.0/256.0]
                                 ) : myShader.setUniform('mask', [0.0, 0.0, 0.0, 
                                                                  0.0, 1.0, 0.0,
                                                                  0.0, 0.0, 0.0]);
                                     myShader.setUniform('blur', blur.checked())});
  
  magnifier = createCheckbox('Magnifier', false);
  magnifier.position(420, 90);
  magnifier.style('color', 'white');
  magnifier.changed(() => { myShader.setUniform('magnifier', magnifier.checked());
  magnifier.checked() ? myShader.setUniform('edge', false) : myShader.setUniform('edge', edge.checked());
                          });
}
```
{{< /details >}}
* setup()

    myShader.setUniform('mask', [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0]) sets a uniform variable named 'mask' in the shader with an initial value of [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0]. This uniform will be used in the shader to control the visual effect. This mask represents the identity effect, so this will show just the original texture.

    emitResolution(myShader) is a function that sets the resolution uniform of the shader to match the canvas size.

    When the 'Edge detection' checkbox is checked, the 'mask' uniform in the shader is set to the values [-1.0, -1.0, -1.0, -1.0, 8.0, -1.0, -1.0, -1.0, -1.0]. If the checkbox is unchecked, the 'mask' uniform is set to the identity matrix.

    Similar to the 'Edge detection' checkbox, the 'Emboss' checkbox sets the 'mask' uniform in the shader to [-2.0, -1.0, 0.0, -1.0, 1.0, 1.0, 0.0, 1.0, 2.0] when checked, and the identity matrix when unchecked.

    The 'Blur' checkbox sets the 'mask5' uniform in the shader to a 5x5 mask array when checked, which represents a blur effect. When unchecked, the 'mask' uniform is set to the identity matrix.

    The 'Magnifier' checkbox toggles the 'magnifier' uniform in the shader. When checked, 'magnifier' is set to true. When unchecked, 'magnifier' is set to false.

{{< details "draw()" open >}}
```javascript
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
```
{{< /details >}}
* draw()

    emitMousePosition(myShader) is a custom function that updates the 'u_mouse' uniform in the shader with the current mouse position.

{{< details "myShader.frag" open >}}
```c
precision mediump float;

uniform sampler2D texture;
// see the emitTexOffset() treegl macro
// https://github.com/VisualComputing/p5.treegl#macros
uniform vec2 texOffset;
// holds the 3x3 kernel
uniform float mask[9];
// holds the 5x5 kernel
uniform float mask5[25];

// we need our interpolated tex coord
varying vec2 texcoords2;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform bool magnifier;
uniform bool edge;
uniform bool blur;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  float pct = 0.0;

  float distanceToMouse = distance(st, u_mouse/u_resolution);
  
  // Only apply the convolution within a certain radius of the mouse
  float convolutionRadius = 0.25; // Adjust this value to control the radius of the convolution
  
  if (magnifier) {
    float radius=1.0;
    float depth=radius/4.0;
    vec2 center = u_mouse.xy / u_resolution.xy;
    float ax = ((st.x - center.x) * (st.x - center.x)) / (0.2*0.2) + ((st.y - center.y) * (st.y - center.y)) / (0.2 / (u_resolution.x / u_resolution.y));
    float dx = 0.0 + (-depth / radius) * ax + (depth / (radius * radius)) * ax * ax;
    float f = (ax + dx);
    if (ax > radius) f = ax;
    vec2 magnifierArea = center + (st - center) * f / ax;
    magnifierArea.y = 1.0 - magnifierArea.y;
    gl_FragColor = vec4(texture2D(texture, magnifierArea));
  } else if (distanceToMouse < convolutionRadius) {
    if (blur) {
      vec2 tc0 = texcoords2 + vec2(-2.0 * texOffset.s, -2.0 * texOffset.t);
      vec2 tc1 = texcoords2 + vec2(-texOffset.s, -2.0 * texOffset.t);
      vec2 tc2 = texcoords2 + vec2(0.0, -2.0 * texOffset.t);
      vec2 tc3 = texcoords2 + vec2(texOffset.s, -2.0 * texOffset.t);
      vec2 tc4 = texcoords2 + vec2(2.0 * texOffset.s, -2.0 * texOffset.t);

      vec2 tc5 = texcoords2 + vec2(-2.0 * texOffset.s, -texOffset.t);
      vec2 tc6 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
      vec2 tc7 = texcoords2 + vec2(0.0, -texOffset.t);
      vec2 tc8 = texcoords2 + vec2(texOffset.s, -texOffset.t);
      vec2 tc9 = texcoords2 + vec2(2.0 * texOffset.s, -texOffset.t);

      vec2 tc10 = texcoords2 + vec2(-2.0 * texOffset.s, 0.0);
      vec2 tc11 = texcoords2 + vec2(-texOffset.s, 0.0);
      vec2 tc12 = texcoords2;  // Current fragment's texture coordinates
      vec2 tc13 = texcoords2 + vec2(texOffset.s, 0.0);
      vec2 tc14 = texcoords2 + vec2(2.0 * texOffset.s, 0.0);

      vec2 tc15 = texcoords2 + vec2(-2.0 * texOffset.s, texOffset.t);
      vec2 tc16 = texcoords2 + vec2(-texOffset.s, texOffset.t);
      vec2 tc17 = texcoords2 + vec2(0.0, texOffset.t);
      vec2 tc18 = texcoords2 + vec2(texOffset.s, texOffset.t);
      vec2 tc19 = texcoords2 + vec2(2.0 * texOffset.s, texOffset.t);

      vec2 tc20 = texcoords2 + vec2(-2.0 * texOffset.s, 2.0 * texOffset.t);
      vec2 tc21 = texcoords2 + vec2(-texOffset.s, 2.0 * texOffset.t);
      vec2 tc22 = texcoords2 + vec2(0.0, 2.0 * texOffset.t);
      vec2 tc23 = texcoords2 + vec2(texOffset.s, 2.0 * texOffset.t);
      vec2 tc24 = texcoords2 + vec2(2.0 * texOffset.s, 2.0 * texOffset.t);

      // Sample texel neighbors within the 5x5 matrix
      vec4 rgba[25];
      rgba[0] = texture2D(texture, tc0);
      rgba[1] = texture2D(texture, tc1);
      rgba[2] = texture2D(texture, tc2);
      rgba[3] = texture2D(texture, tc3);
      rgba[4] = texture2D(texture, tc4);

      rgba[5] = texture2D(texture, tc5);
      rgba[6] = texture2D(texture, tc6);
      rgba[7] = texture2D(texture, tc7);
      rgba[8] = texture2D(texture, tc8);
      rgba[9] = texture2D(texture, tc9);

      rgba[10] = texture2D(texture, tc10);
      rgba[11] = texture2D(texture, tc11);
      rgba[12] = texture2D(texture, tc12);
      rgba[13] = texture2D(texture, tc13);
      rgba[14] = texture2D(texture, tc14);

      rgba[15] = texture2D(texture, tc15);
      rgba[16] = texture2D(texture, tc16);
      rgba[17] = texture2D(texture, tc17);
      rgba[18] = texture2D(texture, tc18);
      rgba[19] = texture2D(texture, tc19);

      rgba[20] = texture2D(texture, tc20);
      rgba[21] = texture2D(texture, tc21);
      rgba[22] = texture2D(texture, tc22);
      rgba[23] = texture2D(texture, tc23);
      rgba[24] = texture2D(texture, tc24);
      
      vec4 convolution;
      for (int i = 0; i < 25; i++) {
        convolution += rgba[i]*mask5[i];
      }

      // 4. Set color from convolution
      gl_FragColor = vec4(convolution.rgb, 1.0); 
    } else {
      vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
      vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
      vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
      vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
      // origin (current fragment texcoords)
      vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
      vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
      vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
      vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
      vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

      // 2. Sample texel neighbours within the rgba array
      vec4 rgba[9];
      rgba[0] = texture2D(texture, tc0);
      rgba[1] = texture2D(texture, tc1);
      rgba[2] = texture2D(texture, tc2);
      rgba[3] = texture2D(texture, tc3);
      rgba[4] = texture2D(texture, tc4);
      rgba[5] = texture2D(texture, tc5);
      rgba[6] = texture2D(texture, tc6);
      rgba[7] = texture2D(texture, tc7);
      rgba[8] = texture2D(texture, tc8);

      // 3. Apply convolution kernel
      vec4 convolution;
      for (int i = 0; i < 9; i++) {
        convolution += rgba[i]*mask[i];
      }

      // 4. Set color from convolution
      gl_FragColor = vec4(convolution.rgb, 1.0); 
    }
  } else {
     // If the pixel is outside the convolution radius, simply display the original texture color
    gl_FragColor = texture2D(texture, texcoords2);
  }
}
```
{{< /details >}}
* myShader.frag

    uniform sampler2D texture represents the input texture that the shader will process.
    uniform vec2 texOffset holds the texture offset used for sampling neighboring texels.
    uniform float mask[9] is a 3x3 kernel used for convolution.
    uniform float mask5[25] is a 5x5 kernel used for convolution.

    uniform vec2 u_resolution stores the resolution of the canvas.
    uniform vec2 u_mouse stores the current mouse position.
    uniform bool magnifier determines whether to apply a magnification effect.
    uniform bool blur determines whether to apply blurring.

    The distanceToMouse variable calculates the distance between the current fragment and the mouse position.

    If magnifier is true, the shader applies a magnification effect. It calculates the distance between the current fragment and the mouse position, modifies the texture coordinates accordingly, and samples the texture to get the magnified color. The result is assigned to gl_FragColor.

    If blur is true, the shader applies a blurring effect. It samples neighboring texels within a 5x5 matrix using offsets, multiplies each texel color with the corresponding value from the mask5 kernel, and sums up the results. The final convolution result is assigned to gl_FragColor.

    If blur is false, the shader applies the mask convolution kernel to sample and convolve neighboring texels within a 3x3 matrix. The convolution result is assigned to gl_FragColor.

    If the current fragment is outside the convolution radius (determined by distanceToMouse), the original texture color is assigned to gl_FragColor.

    <br>
    {{< p5-iframe sketch="/showcase/sketches/image_processing.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="575" height="325" >}}

## 3. Conclusions & future work
Based on the background given and the results of the code, some conclusions can be mentioned:

* Image processing can be used to create effects on images and videos.
* A kernel is a mask that represents the effect in a numerical way.
* A convolution can be very useful to implement the effects defined on the kernels.
* The effects can be applied only to certain parts of the image, for example, around the mouse position.

This was a simple exercise that showed some effects using image processing. In the future, way more effects could be created, trying with way more kernel sizes. Also, image processing could be implemented in other media formats like video-games. Finally, more implementations of image processing apart from effects could be implemented, like facial recognition, matching of images, etc.

## References
* Atalla, M. M., & Kahng, D. (n.d.). Digital image processing. Wikipedia. Retrieved June 19, 2023, from https://en.wikipedia.org/wiki/Digital_image_processing
* Charalambos, J. P. (2023, April 22). Image Processing. Visual Computing. Retrieved June 19, 2023, from https://visualcomputing.github.io/docs/shaders/image_processing/
* Edge detection. (n.d.). Wikipedia. Retrieved June 19, 2023, from https://en.wikipedia.org/wiki/Edge_detection
* Ludwig, J. (n.d.). Image Convolution. Portland State University. Retrieved June 19, 2023, from https://web.pdx.edu/~jduh/courses/Archive/geog481w07/Students/Ludwig_ImageConvolution.pdf
* Magnification. (n.d.). Wikipedia. Retrieved June 19, 2023, from https://en.wikipedia.org/wiki/Magnification
* Powell, V. (n.d.). Image Kernels explained visually. Setosa.IO. Retrieved June 19, 2023, from https://setosa.io/ev/image-kernels/
* Vitor Hugo Carvalho. (2012). Image Processing: Methods, Applications and Challenges. Nova.
