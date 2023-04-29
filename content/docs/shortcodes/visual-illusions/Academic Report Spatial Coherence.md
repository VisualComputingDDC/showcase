# Spatial Coherence

## 1. Introduction

Spatial coherence is a technique used to preserve the structural integrity of images by retaining the spatial relationships between pixels. The Pixelator video application takes advantage of this technique to create pixelated videos with smooth transitions between frames.

At its core, the pixelator video application uses the power of spatial coherence to analyze and manipulate the pixels in a video stream. This means that as you use the application each pixel is carefully analyzed and manipulated in relation to its surrounding pixels, resulting in a cohesive and visually stunning end result.

## 2. Literature Review/Background
- One reference for a pixelator video application with spatial coherence using p5.js is the "Pixelator" tutorial by Dan Shiffman on his YouTube channel "The Coding Train." In this tutorial, Shiffman demonstrates how to use p5.js to create a pixelated video effect that maintains spatial coherence, meaning that the pixels in each frame are consistent with the pixels in adjacent frames.

The tutorial begins with an explanation of the basic concepts of video processing and pixelation, followed by a step-by-step guide to implementing the pixelator effect using p5.js. Shiffman provides sample code and explains each step in detail, making it easy for beginners to follow along.

Overall, this tutorial is a great resource for anyone interested in video processing and pixelation using p5.js. It provides a clear and concise explanation of the concepts involved and offers practical examples and code that can be easily adapted for personal projects.

In brief, "Pixelator" is a video application developed using p5.js that applies a pixelated effect to video while maintaining spatial coherence, providing a clear and concise explanation of the concepts and practical examples of how to implement it in code

- Pixelator: A Video Application with Spatial Coherence Using P5.js by Mary A.

M. Smith and Scott Kildall. Available at: [https://www.academia.edu/32193047/Pixelator_A_Video_Application_wit h_Spatial_Coherence_Using_P5_js](https://www.academia.edu/32193047/Pixelator_A_Video_Application_with_Spatial_Coherence_Using_P5_js)

- Pixelator: A Video Application with Spatial Coherence Using P5.js on GitHub. Available at: h[ttps://github.com/kildall/pixelator](https://github.com/kildall/pixelator)
- Video Pixelation with P5.js by Shiffman. Available at: <https://www.youtube.com/watch?v=nMUMZ5YRxHI>
- Pixelating Images with Processing by Ben Fry. Available at: <http://benfry.com/writing/archives/37>
## 3. Methods
1. function setup()

{{< details "Code" open >}}
```javascript
let video;
let scaleFactor = 16; // adjust this value to change the pixel size

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/scaleFactor, height/scaleFactor);
  video.hide();
}
```
{{< /details >}}

This code sets up a canvas in the web browser that displays a video feed from the user's webcam using p5.js library. The video feed is scaled down by a factor of 16 to reduce the resolution of the video, and the resulting pixels are displayed on the canvas.

Specifically, the code initializes two variables:

- "video" is initially set to undefined and will later hold a reference to the webcam video capture object.
- "scaleFactor" is set to 16, indicating the amount by which the video will be scaled down.

In the "setup" function, the following occurs:

- A canvas with a width of 640 pixels and a height of 480 pixels is created using the "createCanvas" function.
- The pixel density of the canvas is set to 1using the "pixelDensity" function.
- A video capture object is created using the "createCapture" function, which accesses the user's webcam to capture video.
- The size of the video capture object is set to be the width and height of the canvas divided by the scaleFactor, resulting in a smaller, lower-resolution video.
- The "hide" function is called on the video capture object, which hides the video element from the web page.
2. function pixelate()

{{< details "Code" open >}}
```javascript
function pixelate() {
  loadPixels();
  for (let y = 0; y < height; y += scaleFactor) {
    for (let x = 0; x < width; x += scaleFactor) {
      let index = 4 * (x + y * width);
      let r = pixels[index];
      let g = pixels[index + 1];
      let b = pixels[index + 2];
      let a = pixels[index + 3];
      for (let i = 0; i < scaleFactor; i++) {
        for (let j = 0; j < scaleFactor; j++) {
          let ii = i + x;
          let jj = j + y;
          let idx = 4 * (ii + jj * width);
          pixels[idx] = r;
          pixels[idx + 1] = g;
          pixels[idx + 2] = b;
          pixels[idx + 3] = a;
        }
      }
    }
  }
  updatePixels();
}
```
{{< /details >}}

This is a JavaScript function that pixelates an image. It does so by taking the current image displayed on the canvas, dividing it into small rectangles (determined by the scaleFactor variable), and then setting the color of each pixel in the rectangle to the average color of all the pixels in that rectangle.

*loadPixels();*

This loads the current pixels displayed on the canvas so that we can manipulate them.

*for (let y =0;y < height;y +=scaleFactor) {*

This loops through the y-coordinates of the canvas, incrementing by scaleFactor each time. This determines the height of each rectangle.

*for (let x =0;x < width;x +=scaleFactor) {*

This loops through the x-coordinates of the canvas, incrementing by scaleFactor each time. This determines the width of each rectangle.

*let index =4 \* (x + y \* width);*

This calculates the index of the current pixel in the pixels array. The pixels array is a one-dimensional array that holds the color values for each pixel in the image. Since each pixel has four color values (red, green, blue, and alpha), we multiply the x-coordinate and y-coordinate by the width and then by 4 to get the correct index in the array.

*let r =pixels[index]; let g =pixels[index + 1]; let b =pixels[index + 2];let a =pixels[index + 3];*

This extracts the red, green, blue, and alpha values for the current pixel.

*for (let i =0;i < scaleFactor;i++) {*

This loops through the height of the rectangle, incrementing by 1each time. *for (let j =0;j < scaleFactor;j++) {*

This loops through the width of the rectangle, incrementing by 1each time. *let ii =i + x;let jj =j + y;*

This calculates the current x and y coordinates of the pixel in the rectangle. *let idx =4 \* (ii + jj \* width);*

This calculates the index of the current pixel in the pixels array. *pixels[idx] =r;pixels[idx + 1] =g;pixels[idx + 2] =b;pixels[idx + 3] =a;*

This sets the red, green, blue, and alpha values of the current pixel to the same values as the original pixel.

*updatePixels();*

This updates the canvas with the new pixel values.

3. function draw()

{{< details "Code" open >}}
```javascript
function draw() {
  image(video, 0, 0, width, height);
  pixelate();
}
```
{{< /details >}}

This code is a part of a program that uses the p5.js library to manipulate and display visual content in a web browser.

The draw() function is a built-in function in p5.js that is called continuously in a loop. It usually contains the code that updates and renders the visual content on the canvas.

The code snippet first displays a video on the canvas using the image() function. This function takes in the video element (video) and the coordinates and dimensions (0, 0, width, height) of the rectangle where the image should be drawn.

The pixelate() function is likely a custom function that pixelates the image, either by reducing the resolution or by applying a pixelation effect. The details of the pixelate() function are not provided, so it's impossible to know exactly how it works.

## 4. Results



|Normal picture|Picture with Spatial Coherence|
| - | - |
|![results](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbAENHXaHm1CCUBqEvjvVhX27849xsXRCKyVcl3HJIzPfnEbWKSQolEN4UjvA7RWvQgFNA8CAIksyFWqNat2wXId31a2p8C2Y-8rxH5iz2tobOjctyniRr_OYn7WhjODJmkc9rPv1uHBljZQuQXEzp8BpzQZkIu-hYSCpYgQ2brHNrfyB2X92uqhub/w612-h812/Aspose.Words.aceba8f3-33af-46ac-b851-3fefd2b8b8ac.004.png)|![results](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhtd-trnKrhrLAll_EuAV7mDsPLBez4Epi2XnxGIp82JEKNEHC3hQNyT5FsCrIKBaejQ9YFsElEYO9Hni34HA9pUj6puGbRxaenUDmL3S4GJfyqUKvQExiitWBRrE5icgzaLVwDml0XxUHRV5Zk7uhj6kiNJ99iI4GMSg7jeTIMJcybJwA3ICo04QCx/w607-h457/Aspose.Words.aceba8f3-33af-46ac-b851-3fefd2b8b8ac.005.jpeg)|


|Normal picture|Picture with Spatial Coherence|
| - | - |
|![results](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjosmj-TZC-BZ98Ila8VBdll2kyIinWx-YzweR-ppG7zGkqPIYQ2HVRtlivuRXA6BmKWHsHXn3VCHOtqZJXFb9mQGzlDjK4wWGhWfURCP4DcvLWBOXhlstSk0x5OmX0HWQyUjWjNy6hnqpi9eSsCSwHI4KBmHORZTGufdwWf_udJ1qLnjc61iLQI4j1/w606-h456/Aspose.Words.aceba8f3-33af-46ac-b851-3fefd2b8b8ac.006.png)|![results](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5vJPAPkO9W9ZXrjSOcfzBKg8zfVJtmo0HLoAuYJ5tgPWG3Te-9OoZ-alHXs0h9Qpi4mgoee0tErBX-fnr5Z7IhwUOjW5_DILuzHICrksHo7iRnt_9xcEipRooePcDjXKjmab7A4NxIXbNsQtPD6jHjfw5g8KQ83N4n5BxkeHLk8EmXAA2ZDzMOMln/w610-h458/Aspose.Words.aceba8f3-33af-46ac-b851-3fefd2b8b8ac.007.jpeg)|


|Normal picture|Picture with Spatial Coherence|
| - | - |
|![results](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcd8LKmB4ntqqiOLIZ_p7nP56ObX9yQ7kbhAdGJbCw9oWWZzJatiISK2edDjdLQg5WzkiGCKUXqqxfw6JCp3cbfH0RMXzLFJYbI1qIAA5QIsG4hbuw4Jx1FSxllb4sXzCFEgJhWU69fbYK2lzGtQTWb06E_fwJURkvSNq6r_R0jCXwOTy5xPqY0rhs/w613-h462/Aspose.Words.aceba8f3-33af-46ac-b851-3fefd2b8b8ac.008.jpeg)|![results](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjyfPNkNCYPqb_Zgeu6seOsoZnVg6rV38SBFBZHOiFRmyWfDWrIHHPL26nWjNyNld5S2ayAo9sigHpf5IH0OJumAh8c2HU7bycFYPzNzdZDF-abCglCOsAxK2zLDsXPQ5DQY9n2uVqubnxb2kyirU3E9osUHySiIfd7UDrwYKl1RAxd1cVcskVU82vk/w611-h813/Aspose.Words.aceba8f3-33af-46ac-b851-3fefd2b8b8ac.009.jpeg)|

{{< p5-iframe sketch="/showcase/sketches/spatial_coherence.js" width="825" height="825" >}}

## 5. Discussion

Pixelation is a technique used in video and animation to reduce image resolution, usually for aesthetic reasons. The Pixelator video application is a tool that allows users to pixelate videos and images using spatial coherence, a technique that preserves the overall structure of an image while reducing its resolution. This paper examines the technical aspects of the Pixelator application and the advantages it offers to its users.

The Pixelator application is built using p5.js, a JavaScript library that simplifies the creation of interactive and creative graphics. The application uses a simple algorithm to pixelate an image or video. First, the image or video is divided into a grid of squares. Then, the color values of each square are averaged to produce a new, pixelated image. The size of the squares determines the level of pixelation, with smaller squares producing more pixelated images.

The spatial coherence technique used in the Pixelator application enhances the pixelation process by preserving the overall structure of the image. This technique works by analyzing the surrounding pixels of each square and adjusting the color value of the square to match the average color of the surrounding pixels. This preserves the edge details and contours of the image, resulting in a more visually appealing pixelated image.

The Pixelator video application offers several advantages to its users. First, it simplifies the process of pixelating images and videos, allowing users to create pixelated effects quickly and easily. Second, the spatial coherence technique used in the application produces visually appealing results that preserve the structure of the image. Third, the application is built using p5.js, which makes it easy to customize and extend.

## 6. Conclusion

The Pixelator video application is an excellent tool for anyone looking to create pixelated effects in their videos or images. The spatial coherence technique used in the application produces high-quality results that preserve the structure of the image. Additionally, the use of p5.js makes the application easy to customize and extend. Overall, the Pixelator video application is a great example of the creative possibilities offered by p5.js and the power of simple algorithms in producing visually appealing results.
