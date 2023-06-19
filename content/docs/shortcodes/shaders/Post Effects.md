# Post Effects

## 1. Introduction & Background

Implement some posteffects you find interesting.

Convolution is a mathematical operation that combines two functions to produce a third function. In the context of image processing, convolution is used to apply a filter kernel to an image, which can be used to perform operations such as blurring, sharpening, edge detection, and more.

In p5.js, convolution can be implemented using shaders, which are programs that run on the GPU and can perform highly parallelized operations on images. A typical convolution shader consists of a vertex shader and a fragment shader.

The vertex shader is responsible for transforming the input texture coordinates into output vertex positions. This shader is typically very simple and may not need to be modified for different convolution effects.

The fragment shader is where the convolution operation is performed. This shader takes in the input image texture, a filter kernel, and the texture coordinates of the current pixel, and outputs the convolved pixel value.

The fragment shader typically works by iterating over each pixel in the image and applying the convolution kernel to the surrounding pixels. The result of this convolution is a weighted sum of the input pixel values, where each weight is determined by the corresponding value in the kernel.

## 2. Code & results

- Blur.js

In the preload() function, we load the image to apply the effect to the shader. In the setup() function, we create a canvas and set it to use WebGL. In the draw() function, we set the shader and set the necessary uniforms.

- convolution.vert

“precision highp float;” : This line sets the precision for floating-point calculations in the shader. highp stands for high precision, and it ensures that the calculations are performed with maximum accuracy.

“attribute vec3 aPosition;”: This line declares a variable named aPosition, which is an attribute that represents the position of each vertex in the mesh.

“attribute vec2 aTexCoord;” : This line declares a variable named aTexCoord, which is an attribute that represents the texture coordinate for each vertex in the mesh.

“varying vec2 vTexCoord;” : This line declares a variable named vTexCoord, which is a varying variable that will be passed to the fragment shader. It represents the texture coordinate for the current fragment.

The main() function is where the vertex shader does its work. Here's what it does:

“vTexCoord = vec2(aTexCoord.x, 1.0 - aTexCoord.y);” : This line sets the value of vTexCoord to the same value as aTexCoord, but with the y coordinate flipped. This is because the texture coordinates in p5.js have the origin in the upper-left corner, while in OpenGL/WebGL they have the origin in the lower-left corner. Flipping the y coordinate ensures that the texture is sampled correctly.

“gl\_Position = vec4(aPosition, 1.0);”: This line sets the position of the vertex in screen coordinates. It creates a vec4 with the x, y, and z coordinates of aPosition, and a w coordinate of 1.0. This is necessary because OpenGL/WebGL requires homogeneous coordinates for vertices.

- convolution.frag

“precision highp float;”: This line sets the floating-point precision of the shader to high.

“uniform sampler2D tex0;”: This line defines a uniform variable tex0 of type sampler2D, which is a 2D texture. This texture is the input image.

“uniform vec2 texelSize;”: This line defines a uniform variable texelSize of type vec2, which represents the size of a single texel (texture element) in the input image.

“uniform float kernel[9];”: This line defines a uniform variable kernel of type float array with a length of 9. This array represents the convolution kernel which will be used to blur the input image.

“uniform float kernelWeight;”: This line defines a uniform variable kernelWeight of type float, which represents the sum of all the elements in the convolution kernel.

“varying vec2 vTexCoord;”: This line defines a varying variable vTexCoord of type vec2, which will hold the texture coordinates for the current fragment.

void main() {: This line starts the main function of the fragment shader.

“vec2 texCoord = vec2(1.0 - vTexCoord.x, vTexCoord.y);”: This line creates a new variable texCoord of type vec2, which represents the flipped x-coordinate texture coordinates.

“vec4 sum = vec4(0.0);”: This line creates a new variable sum of type vec4, which will be used to store the weighted sum of the convolution kernel applied to the input image.

The next 9 lines are where the convolution is performed. Each line calculates the weighted sum of the convolution kernel applied to a specific pixel in the input image. The texture2D function is used to sample the input image at a specific texture coordinate, and the corresponding element of the convolution kernel is multiplied by the sampled color. This process is repeated for 9 pixels surrounding the current pixel.

“gl\_FragColor = sum / kernelWeight;”: This line sets the output color of the fragment to the weighted sum of the convolution kernel, normalized by the kernel weight. The resulting color is written to the output buffer.

- Image.jpg:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhwbZUdYl4zCLAYtj9-00J249sLD7DYQi0JDq0B6eHlxrWVxXUSvB-7AjJ5vEth2zYi6gNZxc2vkNh4qf0qTSNcTr3IkCx21uYSygnKyGAg-aGtsaxiM3OQ-8z39NN8oBWD8zKPndAI23BAVOar4Oss1lzbE3_vnGuIp4LZeFRSc6Wp8H9W5k_quC6smoc/s320/Aspose.Words.1b5bab1f-6071-49b8-80e4-36b65e7a4849.001.jpeg)

- Image.jpg with the convolution(Blur) postEffect

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhiYVpDKSIzcUuVT2c0iOeFmZ0JW8jX_K0pg-B_R4npT2TB55kVypkD0wri-VenQNasJy7m3QfZGaiAn3nWoA1tD3QogZvmD6jPJiXD6ZpwolYR9fql1SPYhxdnwj2vSLeE3o0Zh6Dqp9IpayjgQ2UyOdseHMJbvNCEkBN5lmidPULn-dBeZtI3yyrsoe8/s320/Aspose.Words.1b5bab1f-6071-49b8-80e4-36b65e7a4849.002.png)

## 3. Conclusion
The implementation of post-effects using convolution shaders in p5.js offers a powerful way to manipulate and enhance images in real-time. Convolution, a mathematical operation combining functions, is leveraged to apply various effects such as blurring, sharpening, and edge detection. The convolution operation is performed within a fragment shader, which runs on the GPU and can handle parallelized operations efficiently. The fragment shader iterates over each pixel in the image, applying a convolution kernel to calculate a weighted sum of surrounding pixel values. This process results in a new convolved pixel value. The vertex shader, responsible for transforming input texture coordinates to output vertex positions, typically requires minimal modification for different convolution effects.

By understanding and leveraging shaders, developers can explore a wide range of post-effects and creative image manipulations. Convolution shaders offer a flexible and efficient approach to achieve visually appealing results. The ability to perform these operations in real-time using p5.js and WebGL opens up new possibilities for interactive graphics and visual experiences on the web. Further experimentation and exploration of convolution and other shader-based techniques can lead to exciting and innovative visual effects in web-based applications.
