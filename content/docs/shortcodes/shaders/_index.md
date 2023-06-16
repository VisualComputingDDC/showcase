---
bookCollapseSection: true
---

# Shaders
Shaders are programs that are used in computer graphics to control the rendering of visual effects and manipulate the appearance of objects and surfaces in a 3D scene. They are written in a specialized shading language, such as OpenGL Shading Language (GLSL) or High-Level Shading Language (HLSL), and executed on the GPU (Graphics Processing Unit) to perform real-time calculations.

Shaders are a fundamental part of modern computer graphics pipelines and are responsible for generating the colors, textures, lighting, and various visual effects seen in video games, animated movies, virtual reality applications, and other interactive visual experiences.

There are different types of shaders, each with its specific purpose:

1. Vertex Shaders: These shaders operate on individual vertices of 3D models. They perform transformations such as translation, rotation, scaling, and projection to position the vertices correctly in 3D space. They can also calculate per-vertex lighting and pass data to other shaders.

2. Pixel (Fragment) Shaders: Pixel shaders are responsible for determining the final color of each pixel or fragment of a rendered image. They calculate the color based on factors like lighting conditions, material properties, textures, and other visual effects. Pixel shaders can produce realistic lighting effects, shadows, reflections, refractions, and complex surface appearances.

3. Geometry Shaders: Geometry shaders take incoming primitive shapes, such as points, lines, or triangles, and can generate new geometry or modify existing geometry. They allow for operations such as tessellation, particle system generation, or procedural geometry manipulation.

4. Compute Shaders: Compute shaders are used for general-purpose computation on the GPU. They are not restricted to graphics tasks and can be used for tasks like physics simulations, data processing, or parallel computations that can benefit from the GPU's parallel processing capabilities.

Shaders provide artists, designers, and developers with a powerful toolset to create visually stunning and immersive graphics in real-time applications. By manipulating the behavior of shaders, developers can achieve a wide range of visual effects and achieve the desired look and feel for their applications.

## Types

{{<section>}}
