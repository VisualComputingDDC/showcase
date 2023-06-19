# Spatial Coherence

## 1. Introduction & Background
Downsampling to convert an image to grayscale using shaders.

Technique: To convert an image to grayscale using shaders, we use downsampling. So, it reduces the resolution of the image by averaging multiple pixels into a single pixel, resulting in a lower resolution image. This technique applied in the following way to convert an image to grayscale using shaders:

First, the image is loaded into the shader program as a texture. The shader program reads the texture and downsamples the image by averaging the color values of adjacent pixels. The downsampled image is stored in a new texture with a lower resolution. The shader program then reads the downsampled image and applies a grayscale filter to each pixel. This is typically done by calculating the average value of the red, green, and blue color channels for each pixel and setting all three channels to this value. The resulting grayscale image is stored as a new texture or rendered directly to the screen.

It's worth noting that downsampling can result in a loss of detail and information in the image.

Images that we use:

1\. Retrato - Nadar.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirou3exNxqra4QGLQXdHjA7jAeLv5oEfjVVvmFjnIBoB7Y7W5B3Ic72zieqaa5a5j0e6N4ldXW76SuEfJpqeWG70oZ8Il5FmRnQjv7XUUr4uQUS7OodLKnoY3aWjtytgHG6THfjgIZ2OThbVOPaGU22LvUgeA1Ojec237CuLYqatjaIKmIY9zb0MFScO8/s1600/Aspose.Words.2a55bee0-0933-45e2-bef1-40574ab4a90d.001.png)

2. La joven de la perla - Johannes Vermeer

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9GwYNKHAgS_XAAK7c2goq3sA0grQQH-pc67AiElmnpu-uackz72aVmzDMaAEBjsh3Bvu_F1o9NPh0RY9e0Ro_TZTkI39R49hjRMf8NuOoD0KZ_Uu9-yJfAGp2w3RsZpYTTThgxLtZKYlxi7n9abiagv7vabQMOpMVpTGBq58kTu75L9n2UAzheKUrTWA/s1600/Aspose.Words.2a55bee0-0933-45e2-bef1-40574ab4a90d.002.png)

3\. La Gioconda - Leonardo Da Vinci

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijyH2LXHovISHbTo2OFLgSxw_pGtBkgG672_z6w61rHlrjRLqkFIMWg8Mcqjs3stWgPHwmrYz2tEM0rpRqY-i772JHdWvEzchXSNv6uU9lkpBuWq9z7GjwC9b_voxe579Y32up4VqZN44uXwiJeFY_IcJmlPFfLU1qZOPfuo71-Gafln0rnMz_FlxDIxg/s1600/Aspose.Words.2a55bee0-0933-45e2-bef1-40574ab4a90d.003.jpeg)

## 2. Code & results

**Fragment shader code:**

- precision highp float;

This sets the precision for floating-point operations in the shader. In this case, highp means high precision.

- uniform sampler2D tex0;

This declares a uniform variable tex0 of type sampler2D, which will be used to sample the input texture.

- varying vec2 vTexCoord;

This declares a varying variable vTexCoord of type vec2, which will be used to pass the texture coordinates from the vertex shader to the fragment shader.


- void main() {

This is the entry point for the fragment shader. This function is called once for each pixel in the output image.

- vec4 color = texture2D(tex0, vTexCoord);

This samples the input texture tex0 at the texture coordinates specified by vTexCoord and assigns the resulting color value to color.

- float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));

This calculates the grayscale value of the pixel using the dot product of the color vector (color.rgb) and a vector containing the weights for the red, green, and blue channels (vec3(0.299, 0.587, 0.114)). These weights are commonly used in image processing to create a luminance-based grayscale conversion.

- gl\_FragColor = vec4(vec3(gray), color.a);

This sets the output color for the current pixel to a new vec4 value, where the RGB channels are set to the grayscale value (vec3(gray)) and the alpha channel is set to the alpha value of the input color (color.a).

**Vertex shader code:**

- attribute vec3 aPosition;
- attribute vec2 aTexCoord;

These lines declare two attribute variables: aPosition of type vec3, which stores the position of each vertex in the mesh, and aTexCoord of type vec2, which stores the texture coordinates for each vertex.

- uniform mat4 uModelViewMatrix;
- uniform mat4 uProjectionMatrix;

These lines declare two uniform variables: uModelViewMatrix of type mat4, which is a matrix that transforms vertices from object space to view space, and uProjectionMatrix of type mat4, which is a matrix that transforms vertices from view space to clip space.

- varying vec2 vTexCoord;

This declares a varying variable vTexCoord of type vec2, which will be used to pass the texture coordinates from the vertex shader to the fragment shader.

- void main() {

This is the entry point for the vertex shader. This function is called once for each vertex in the mesh.

- gl\_Position = uProjectionMatrix \* uModelViewMatrix \* vec4(aPosition, 1.0);

This line calculates the position of the vertex in clip space by multiplying the vertex position in object space (aPosition) by the model-view matrix (uModelViewMatrix), then by the projection matrix (uProjectionMatrix), and finally by a homogeneous coordinate vec4(aPosition, 1.0). The resulting clip-space position is assigned to gl\_Position, a built-in variable that represents the position of the vertex in clip space.

- vTexCoord = aTexCoord;

This line assigns the texture coordinates for the current vertex (aTexCoord) to vTexCoord, which will be passed on to the fragment shader for texture sampling.

**Applying the code, the image get the following output**

1\. Retrato - Nadar.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjRAAJ-eaALus7cDtG5FkMAV62J5v2AYGoUV0Bo5L2PTQGhjxxwdRwn_UFKxhFquMSXJqbAg7qRwFccC66l-yucgwSkEupmpIWou57g1bKc-UHJi1DuIy71hGvhpbd7DAUCNh0jsZM3y0d5o-7MBad-R0hLg2k7zKDkbai8pXLw_OML24Da1NeDzsRz5vs/s1600/Aspose.Words.2a55bee0-0933-45e2-bef1-40574ab4a90d.004.png)

2. La joven de la perla - Johannes Vermeer.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgiVsDgBQDNMAqP21C_XYQMQDS9ikgVuD2WxbbwGgm7bGuqmW_c26-m-CoCMQiT-h6px1BgPtXcqDr5p-GfZVTnI852D5cwR04oXYev0gwa6f3IlY4k0y5VLJivT2MBsB8B_rUb7jxT7e5S1Rvg0hgQDQ-3JHVko-W3RGMvYIzWV4MgjrVLCLqPAixxohU/s1600/Aspose.Words.2a55bee0-0933-45e2-bef1-40574ab4a90d.005.png)

3\. La Gioconda - Leonardo Da Vinci.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrZoUMIyNtHUZggW-IlwNraf6Ji5kCt1SXUC-9cfQVTv8_XfPk0gmpfjGRYfy6OK2l58J_Tvh09hliqZMceOYb-Z6e6Cwy-ISb0hQ1rNK5nVjnx0cDnNR497UzPPs7P-t3ZfvIQTG7TPOaJ2Z8sxeDEZNcOg754-M9LYsg_hciUMoE1eiPsM2zyR-kK9g/s1600/Aspose.Words.2a55bee0-0933-45e2-bef1-40574ab4a90d.006.jpeg)

## 3. Conclusion

The downsampling process to convert an image to grayscale using shaders can make the image appear to have lower resolution or be more pixelated because it involves reducing the number of pixels in the image.

When an image is downsampled, some of the original pixels are discarded or averaged to create a new, smaller image. In the case of grayscale conversion using

shaders, this downsampling is typically done by rendering the image to a smaller texture using a fragment shader that calculates the grayscale value of each pixel. The resulting texture may have a lower resolution than the original image, depending on the size of the output texture.

Because downsampling involves reducing the number of pixels in the image, some details may be lost or blurred in the downsampling process. For example, if the original image contains fine lines or intricate patterns, these details may become less distinct or disappear altogether in the downsampled version. This loss of detail can make the image appear to have lower resolution or be more pixelated.
