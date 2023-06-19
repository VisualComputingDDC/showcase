# Procedural Texturing

## 1. Introduction & Background
The goal in procedural texturing is to procedurally generate a texture using an algorithm in such a way that the result can be mapped onto a shape as a texture. Procedural texturing requires the use of a frame buffer object which in p5.js is implemented as a p5.Graphics object (Procedural Texturing, 2023).

A framebuffer (frame buffer, or sometimes framestore) is a portion of random-access memory (RAM) containing a bitmap that drives a video display. It is a memory buffer containing data representing all the pixels in a complete video frame. Modern video cards contain framebuffer circuitry in their cores. This circuitry converts an in-memory bitmap into a video signal that can be displayed on a computer monitor (Framebuffer, n.d.). 

In this exercise, two adapted patterns from the book of shaders (The Book of Shaders: Patterns, n.d.) are mapped as textures onto two different 3D shapes. The first shape is a torus whose level of details can be altered by the user, and the second one is a cube. In both codes, the user can interact with the canva to change the camera direction.

There have been different approaches and implementations of procedural texturing, for example, for the simulation of the annual ring patterns of solid wood with knots (Procedural texturing of solid wood with knots, 2022) that can be studied in the biology field, simulation of clouds (Simulating clouds with procedural texturing techniques using the GPU, 2012), etc.

## 2. Code & results

{{< details "setup()" open >}}
```javascript
function setup() {
  createCanvas(550, 400, WEBGL);
  
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  
  detailX = createSlider(3, 24, 3);
  detailX.position(10, height + 5);
  detailX.style('width', '80px');
  
  pg.shader(myShader);
  
  pg.emitResolution(myShader);
  
  myShader.setUniform('u_zoom', 3);
  
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  
  texture(pg);
}
```
{{< /details >}}

* setup()

    The pg variable is created using the createGraphics() function. It creates a separate graphics buffer with a size of 400 pixels by 400 pixels using the WEBGL renderer. This buffer will be used for rendering textures.

    The textureMode(NORMAL) function sets the texture coordinate mode to NORMAL, which means that the texture coordinates will be normalized between 0 and 1.

    The detailX variable is created using the createSlider() function. It creates a slider UI element with a minimum value of 3, maximum value of 24, and an initial value of 3.

    The pg.shader(myShader) line assigns the custom shader to the pg graphics buffer.

    The myShader.setUniform('u_zoom', 3) line sets the uniform variable 'u_zoom' in the shader to a value of 3. This value is used to control the zoom level in the shader calculations.

    The pg.quad(-1, -1, 1, -1, 1, 1, -1, 1) function call draws a quadrilateral shape in the pg graphics buffer. The provided coordinates (-1, -1), (1, -1), (1, 1), and (-1, 1) represent the four corners of the quad.

    Finally, the texture(pg) function call sets the pg graphics buffer as the texture for subsequent rendering on the canvas.

{{< details "draw() Program 1" open >}}
```javascript
function draw() {  
  background(33);
  orbitControl();
  torus(150, 80, detailX.value(), 12);
}
```
{{< /details >}}
{{< details "draw() Program 2" open >}}
```javascript
function draw() {
  background(33);
  orbitControl();
  box(300);
}
```
{{< /details >}}
* draw()

    The orbitControl() function enables mouse-based orbit control for the 3D canvas. It allows the user to interactively rotate and zoom the 3D scene by dragging the mouse.

    _Program 1_. The torus(150, 80, detailX.value(), 12) function call draws a torus shape in the 3D canvas. The torus has a major radius of 150, a minor radius of 80, and a number of sides (detail) determined by the value of the detailX slider (obtained using detailX.value()). The last parameter, 12, specifies the number of segments around the torus.

    _Program 2_. The box() function is a built-in p5.js function used to draw a 3D box shape.

{{< details "mouseMoved()" open >}}
```javascript
function mouseMoved() {
  myShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1)
}
```
{{< /details >}}
* mouseMoved()

    The line myShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30))) adjusts the value of the uniform variable u_zoom in the shader based on the current x-coordinate of the mouse (mouseX). The map() function is used to map the range of mouseX from the range of 0 to the width of the canvas (width) to a new range of 1 to 30. The resulting value is then converted to an integer (int) and assigned to the u_zoom uniform in the shader. This code adjusts the zoom level of the shader effect based on the horizontal position of the mouse.

    The pg.quad(-1, -1, 1, -1, 1, 1, -1, 1) line draws a quadrilateral shape in the pg graphics buffer. The provided coordinates (-1, -1), (1, -1), (1, 1), and (-1, 1) represent the four corners of the quad. This line is used to redraw the contents of the pg buffer after updating the u_zoom uniform.

{{< details "Common in shader1.frag and shader2.frag" open >}}
``` c
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_zoom;

vec2 rotate2D (vec2 _st, float _angle) {
  _st -= 0.5;
  _st = mat2(cos(_angle), -sin(_angle),
            sin(_angle), cos(_angle)) * _st;
  _st += 0.5;
  return _st;
}

vec2 tile (vec2 _st, float _zoom) {
  _st *= _zoom;
  return fract(_st);
}

vec2 rotateTilePattern(vec2 _st) {
  _st *= 2.0;
  
  float index = 0.0;
  index += step(1., mod(_st.x,2.0));
  index += step(1., mod(_st.y,2.0))*2.0;
  
  _st = fract(_st);
  
  if(index == 1.0){
    _st = rotate2D(_st,PI*0.5);
  } else if(index == 2.0){
    _st = rotate2D(_st,PI*-0.5);
  } else if(index == 3.0){
    _st = rotate2D(_st,PI);
  }
  
  return _st;
}
```
{{< /details >}}
* Common in shader1.frag and shader2.frag
        
    The uniform vec2 u_resolution; line declares a uniform variable u_resolution of type vec2 that represents the resolution (width and height) of the canvas or viewport.

    The uniform float u_zoom; line declares a uniform variable u_zoom of type float that represents the zoom level.

    The rotate2D() function takes a 2D vector _st and an angle _angle and rotates the vector around the origin (0.5, 0.5) using a 2D rotation matrix. The rotated vector is then shifted back to its original position before returning it.

    The tile() function scales the input vector _st by _zoom and returns the fractional part of the scaled vector. This function is used to create a tiling effect based on the zoom level.

    The rotateTilePattern() function takes an input vector _st and performs a rotation on it based on a tile pattern. The function first scales the input vector by 2.0, and then calculates an index value based on the modulo operation (mod()) on the x and y coordinates of the scaled vector. The index value determines the type of rotation to apply. If the index is 1, the vector is rotated by 90 degrees; if the index is 2, the vector is rotated by -90 degrees; if the index is 3, the vector is rotated by 180 degrees. Finally, the function returns the rotated vector.

{{< details "main() in shader1.frag" open >}}
``` c
void main (void) {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  
  st = tile(st, u_zoom);
  st = rotateTilePattern(st);
  
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d = 0.0;
  
  st = st *2.-1.;
  
  d = length( abs(st)-.3 );
  d = length( min(abs(st)-.3,0.) );

  gl_FragColor = vec4(vec3(fract(d*10.0)),1.0);
}
```
{{< /details >}}
{{< details "main() in shader2.frag" open >}}
``` c
void main (void) {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  
  st = tile(st, u_zoom);
  st = rotateTilePattern(st);
  
  vec3 color = vec3(0.0);

  vec2 pos = vec2(0.5)-st;

  float r = length(pos)*2.0;
  float a = atan(pos.y,pos.x);

  float f = cos(a*3.);

  color = vec3( 1.-smoothstep(f,f+0.02,r) );

  gl_FragColor = vec4(color,1.0);
}
```
{{< /details >}}

* main() in shader1.frag

    Overall, this fragment shader code generates a visual effect by creating a tiled pattern that rotates based on the specified zoom level, and applies a distance-based color effect around a threshold. The resulting color is then assigned to each fragment to produce the final rendered image.

* main() in shader2.frag

    Overall, this fragment shader code generates a visual effect by creating a tiled pattern that rotates based on a specified zoom level. It calculates the distance and angle from the center of the fragment to create a color value using the smoothstep function. The resulting color is then assigned to each fragment to produce the final rendered image.
    <br></br>
    **DRAG AND ZOOM!**

    {{< p5-iframe sketch="/showcase/sketches/procedural_texturing_toro.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="570" height="430" >}}
    <br></br>
    {{< p5-iframe sketch="/showcase/sketches/procedural_texturing_box.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="570" height="430" >}}

## 3. Conclusions & future work
Based on the background given and the results of the code, some conclusions can be mentioned:

* Procedural texturing can be used to map a texture into a 3D figure.
* A p5.Graphics object allows to create a graphics buffer object, acting as another canva.
* Shaders are useful to create different patterns that can be used as textures, this patterns can be static or change when necessary.

In this exercise, very simple examples of procedural texturing were shown. With this first steps, way more complex and creative work could be done in the future, such as very realistic textures for video-games or movies, more dinamic textures that can change with interaction of the user, automatic generation of textures depending on the 3D objects using AI, and more.


## References
* The Book of Shaders: Patterns. (n.d.). Book of Shaders. Retrieved June 16, 2023, from https://thebookofshaders.com/09/
* Larsson, M., Ijiri, T., Yoshida, H., Huber, J. A. J. . 1989, Fredriksson, M. 1984, Broman, O., & Igarashi, T. (2022). Procedural texturing of solid wood with knots. ACM Transactions on Graphics, 41(4). https://doi-org.ezproxy.unal.edu.co/10.1145/3528223.3530081
* Procedural Texturing. (2023, May 9). Visual Computing. Retrieved June 16, 2023, from https://visualcomputing.github.io/docs/shaders/procedural_texturing/
* Framebuffer. (n.d.). Wikipedia. Retrieved June 16, 2023, from https://en.wikipedia.org/wiki/Framebuffer
* Simulating clouds with procedural texturing techniques using the GPU. (2012).
