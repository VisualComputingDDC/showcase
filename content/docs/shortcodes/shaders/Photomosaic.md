# Photomosaic

## 1. Introduction & Background
Photomosaic is a technique in visual computing that involves creating a larger image by assembling numerous smaller images called tiles. These tiles, often small photographs or images, are carefully chosen to replicate the colors and patterns of specific regions within the larger target image. When viewed from a distance, the tiles blend together to form a cohesive and visually appealing composition. Photomosaic has gained popularity as a creative and artistic way to transform images into stunning collages and visual representations.

Photomosaic has been a subject of interest in the field of visual computing, attracting researchers and artists alike. Various studies and research papers have explored different aspects of photomosaic creation, algorithms, and applications. Here are some key areas covered in the literature:

Tile Selection Algorithms:
One crucial aspect of photomosaic creation is the selection of appropriate tiles to match the target image regions accurately. Several algorithms have been proposed to optimize the tile selection process. These algorithms consider factors such as color similarity, texture, and spatial arrangement to ensure a visually pleasing and coherent result. Research has focused on developing efficient and effective tile selection techniques to improve the quality of photomosaic compositions.

Image Analysis and Processing:
Photomosaic involves analyzing the target image to identify regions and extract features for tile placement. Image analysis techniques such as color histograms, edge detection, and texture analysis are employed to partition the target image into smaller regions and determine the best matching tiles. Additionally, image processing methods like color correction and blending are applied to enhance the visual quality and seamless integration of tiles.

Computational Efficiency:
Creating a photomosaic can be computationally intensive, especially for large-scale images with a high number of tiles. Researchers have explored techniques to optimize the computational efficiency of the photomosaic generation process. This includes parallel computing, distributed systems, and algorithmic optimizations to reduce the time and resources required for creating photomosaics.

Applications and Artistic Expressions:
Photomosaic techniques have found applications in various domains, including art, design, and visual communication. Artists and designers have leveraged photomosaic to create unique visual representations, collages, and illustrations. Moreover, photomosaic has been applied to image compression, image synthesis, and interactive multimedia systems, allowing for novel and creative applications in visual computing.

By studying the existing literature on photomosaic, researchers and practitioners aim to advance the field by developing new algorithms, refining techniques, and exploring innovative applications. The interdisciplinary nature of photomosaic research brings together computer graphics, image processing, computer vision, and human-computer interaction to create captivating and visually striking compositions from individual tiles.

## 2. Code & results
The code demonstrates how to implement photomosaic using shaders in P5.js. The code utilizes shaders to create a photomosaic by replacing regions of the image with smaller images called tiles.

{{< details "variable declarations" open >}}
```javascript
let img;
let tileSize = 10; // Size of each mosaic tile
let colorImages = []; // Array to store the color images
let Shader;
```
{{< /details >}}

* Variable Declarations:

    Variable Declarations:
    img: It stores the target image to be transformed into a photomosaic.
    tileSize: It represents the size of each tile in the mosaic.
    colorImages: It is an array that holds the color images used as tiles.
    Shader: It stores the shader program.

{{< details "preload()" open >}}
```javascript
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
```
{{< /details >}}

* preload()

    preload() Function:
    The function loads the target image (principal.jpg) and color images (amarillo.webp,    azul_claro.webp, etc.) into the corresponding variables.

{{< details "setup()" open >}}
```javascript
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
```
{{< /details >}}

* setup()

    setup() Function:
    The function creates a canvas with the same dimensions as the target image using 
    createCanvas().
    The shader program is created using createShader() and stored in the Shader variable.
    Uniform variables in the shader program are set using Shader.setUniform(). These variables  include the target image (uImage), tile size (uTileSize), the number of color images     (uColorCount), and the color images themselves (uColorImages).
    A for loop iterates over the colorImages array to set the uColorImages uniform for each color   image.
    Finally, noLoop() is called to ensure that the draw() function is executed only once.

{{< details "draw()" open >}}
```javascript
function draw() {

  shader(Shader);
  
}
```
{{< /details >}}

* draw()

    draw() Function:
    The function applies the Shader program to the canvas using the shader() function, which    activates the photomosaic effect.

{{< details "vertShader" open >}}
```javascript
const vertShader = `
precision highp float;
attribute vec3 aPosition;
varying vec2 vTexCoord;

void main() {
  vTexCoord = (aPosition.xy + 1.0) / 2.0;
  gl_Position = vec4(aPosition, 1.0);
}
`;
```
{{< /details >}}

* vertex shader

    vertShader is responsible for setting the position of each vertex in the mesh.

{{< details "fragShader" open >}}
```javascript
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
```
{{< /details >}}

* fragment shader

    fragShader is the fragment shader that performs the photomosaic effect.
    The fragment shader takes the target image and divides it into tiles using the uTileSize    uniform. It then calculates the closest color match for each tile by comparing it with the     color images (uColorImages). The resulting color is assigned to gl_FragColor, which determines  the final color of each fragment in the mosaic.
    
    In summary, this code uses shaders to create a photomosaic effect by replacing regions of the   target image with smaller color images (tiles) based on their closest color match. The    resulting image is rendered on a canvas using WebGL.

{{< p5-iframe sketch="/showcase/sketches/photomosaic.js" width="825" height="825" >}}

## 3. Conclusion
The photomosaic technique in visual computing involves creating a larger image using numerous smaller images called tiles. This technique has attracted interest in the field, leading to research and exploration in various areas. Tile selection algorithms have been developed to optimize the process of selecting tiles that accurately replicate the colors and patterns of the target image. Image analysis and processing techniques are used to partition the target image, extract features, and enhance the visual quality of the photomosaic. Efforts have also been made to improve the computational efficiency of photomosaic generation, considering the resource-intensive nature of the process. Photomosaic techniques find applications in art, design, image compression, and interactive multimedia systems, allowing for creative expressions and innovative uses in visual computing.

The provided code demonstrates how to implement a photomosaic effect using shaders in P5.js. It utilizes shaders to replace regions of the target image with smaller images (tiles), creating the photomosaic effect. The code loads the target image and color images, sets up the shader program with necessary uniform variables, and applies the shader program to create the photomosaic effect. By combining the techniques presented in the literature with the implementation in the code, it becomes possible to generate captivating and visually striking compositions from individual tiles. This code serves as a practical demonstration of the photomosaic technique and can be further extended and customized to explore different variations and artistic expressions.
