# Texture Sampling

## 1. Introduction & Background
A texture map is an image applied (mapped) to the surface of a shape or polygon. This may be a bitmap image or a procedural texture. They may be stored in common image file formats, referenced by 3d model formats or material definitions, and assembled into resource bundles (Texture Mapping, n.d.).

Texture sampling is the process of reading textures through the GPU. Graphics Hardware embeds a set of texture units that are able to read texture pixels directly or sample these textures using different algorithms (Sampling Textures - VFXDoc, n.d.).

For this exercise, the HSV value V and HSL Lightness L coloring brightness tools are computed from an image and a video, this is acquired through the sampling of the texture of both media formats.

HSL (for hue, saturation, lightness) and HSV (for hue, saturation, value; also known as HSB, for hue, saturation, brightness) are alternative representations of the RGB color model, designed in the 1970s by computer graphics researchers. In these models, colors of each hue are arranged in a radial slice, around a central axis of neutral colors which ranges from black at the bottom to white at the top (Zenil, n.d.).

<img src="https://drive.google.com/uc?export=view&id=1c3ave6YFFim_U4l-N4DOEqYAA3cE0gYy" alt="results" width=80% ></img>   

_Figure 1. HSL and HSV cut-away 3D models._

For this exercise, the HSV value V and HSL Lightness L are going to be calculated as follows:

* In the HSV "hexcone" model, value is defined as the largest component of a color.
    
        V = max(R, G, B) = M
	
* In the HSL "bi-hexcone" model, lightness is defined as the average of the largest and smallest color components, i.e. the mid-range of the RGB components.
    
        L = mid(R, G, B) = 1/2(M + m)

In texturing, the V and L values can be used in the following ways:

* Brightness adjustment: The V value in the HSV model and the L value in the HSL model represent the luminance or brightness of a color. By manipulating these values, you can change the brightness of the texture, allowing you to darken or lighten it as needed.

* Shading: By changing the V or L values, you can apply shading to the texture. Decreasing these values darkens the texture, which can help simulate shaded areas or create specific lighting effects.

* Highlighting: Increasing the V or L values can highlight the texture. This can be useful for simulating illuminated areas or enhancing specific features in the texture.

* Contrast control: The difference between the V or L values can influence the overall contrast of the texture. By adjusting these values, you can increase or decrease the contrast, which can be useful for emphasizing or softening certain details.


## 2. Code & results
{{< details "setup()" open >}}
```javascript
function setup() {
  createCanvas(800, 450, WEBGL);
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
```
{{< /details >}}

- setup() <br>
    This p5.js code sets up a sketch with a 3D canvas using the WEBGL renderer. The sketch creates a user interface with checkboxes to control various visual effects.

    The textureMode(NORMAL) function sets the texture coordinates to be normalized between 0 and 1.

    The line shader(myShader) assigns the custom shader to the sketch.

    Checkboxes labeled "HSV value V" and "HSL lightness L" are created. When their values change, the code updates the corresponding shader uniforms ('value' and 'lightness') with the checkbox values.

{{< details "draw()" open >}}
```javascript
function draw() {
  myShader.setUniform('texture', src);
  beginShape();
  
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}
```
{{< /details >}}
* draw() <br>
    In this code, myShader.setUniform('texture', src); sets the value of a shader uniform called 'texture' to the value of the variable src. The shader will use this texture for further calculations or rendering.

    The vertex() function is used to define individual vertices of the shape. Each vertex is specified with its position in 3D space (x, y, z) and its corresponding texture coordinates (u, v). The coordinates (-1, -1, 0, 0, 1), (1, -1, 0, 1, 1), (1, 1, 0, 1, 0), and (-1, 1, 0, 0, 0) represent four corners of a rectangle. The first three values represent the 3D position, and the last two values represent the texture coordinates.

{{< details "myShader.frag" open >}}
```c
precision mediump float;

uniform bool value;
uniform bool lightness;
uniform sampler2D texture;
uniform bool uv;

varying vec2 texcoords2;

// Returns the HSV value V
float v_value(vec4 texel) {
  return max(texel.r, max(texel.g, texel.b));
}

// Returns the HSL lightness L
float l_value(vec4 texel) {
  return 1.0/2.0*(max(texel.r, max(texel.g, texel.b)) + min(texel.r, min(texel.g, texel.b)));
}

void main() {
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = uv ? vec4(texcoords2.st, 0.0, 1.0) : value ? vec4(vec3(v_value(texel)), 1.0) : lightness ? vec4(vec3(l_value(texel)), 1.0) : texel;
}
```
{{< /details >}}
- myShader.frag <br>
    The line varying vec2 texcoords2; declares a varying variable that holds the texture coordinates passed from the vertex shader.

    The following two functions are defined:

    * float v_value(vec4 texel) calculates and returns the maximum value (V) from the RGB components of the texel color.
    * float l_value(vec4 texel) calculates and returns the lightness (L) value from the RGB components of the texel color using HSL color space.

    Inside the main() function:

    * vec4 texel = texture2D(texture, texcoords2); samples the provided texture using the texcoords2 texture coordinates and assigns the resulting color to the texel variable.

    * The gl_FragColor variable represents the final color of the fragment. The next line sets its value based on the boolean variables and calculations:

        * If uv is true, it sets gl_FragColor to the texture coordinates as a vector with z set to 0 and w set to 1 (representing the color with no transparency).
        * If value is true, it sets gl_FragColor to the HSV value (V) of the texel color, represented as a vector with w set to 1.
        * If lightness is true, it sets gl_FragColor to the HSL lightness (L) of the texel color, represented as a vector with w set to 1.
        * If none of the above conditions are true, it sets gl_FragColor to the original texel color, preserving it.

    <br>
    {{< p5-iframe sketch="/showcase/sketches/texturing.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="700" height="424" >}}

## 3. Conclusions & future work
Based on the background given and the results of the code, some conclusions can be mentioned:
* The V value in the HSV model and the L lightness in the HSL model represent the luminance or brightness of a color.
* These values can be used for brightness adjustment, shading, highlighting, contrast control, etc.
* With the use of shaders, an image or a video can be processed to acquire different characteristics of this media files, like the V value and the L lightness.

This exercise is just a simple example of the great capabilities of shaders, in the future, it could be possible to implement more coloring brightness tools in more media formats like video-games. Then, these values could be extremely useful for different techniques like photomosaic or post effects.


## References
* Sampling Textures - VFXDoc. (n.d.). VFXDoc. Retrieved June 15, 2023, from https://vfxdoc.readthedocs.io/en/latest/textures/sampling/
* Texture mapping. (n.d.). Wikipedia. Retrieved June 15, 2023, from https://en.wikipedia.org/wiki/Texture_mapping
* Zenil, H. (n.d.). HSL and HSV. Wikipedia. Retrieved June 15, 2023, from https://en.wikipedia.org/wiki/HSL_and_HSV

