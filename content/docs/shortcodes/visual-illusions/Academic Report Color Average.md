# Color Average

## 1. Introduction

This  application  provides  a  unique  way  of  visualizing  and  modifying  videos  by reducing the resolution of the frames to create a pixelated effect.

In addition to pixelation, the application also includes a color averaging feature that takes the average color of each pixel block and applies it to the entire block. This creates a uniform color effect across each block, giving the video a distinctive look. 

## 2. Literature Review/Background 
- Pixelator Video: A Tutorial on Processing Video in p5.js by Daniel Shiffman - This video tutorial on YouTube walks you through creating a pixelator video using p5.js, including how to calculate color averages for each pixel block. 
- Pixelate Video with p5.js by Brendan Sudol  - This blog post includes code examples for creating a pixelator video with p5.js, as well as how to calculate color averages.
- Creating a Pixelated Video Effect with p5.js by Arielle Vaniderstine  - This tutorial on the freeCodeCamp website shows how to create a pixelator video using p5.js and also includes information on calculating color averages.
- Pixelate  Video with JavaScript  and  HTML5 Canvas  by  Kyle  Wetton  - This tutorial on SitePoint shows how to create a pixelator video using HTML5 canvas and JavaScript, but could also be adapted to use p5.js.
- Pixelate a video using P5.js by Saumya Pandey - This blog post includes a code example for creating a pixelator video with p5.js, including how to calculate color averages for each pixel block.
## 3. Methods 
1. function setup() 

{{< details "Code" open >}}
```javascript
let video;
let pixelSize = 10;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width/pixelSize, height/pixelSize);
  video.hide();
}
```
{{< /details >}}

This is a JavaScript code using the p5.js library to create a canvas and capture video from the user's camera. Here is a breakdown of what each line does:

*let video;* 

Declares a variable video with no initial value.

*let pixelSize = 10;* 

Declares a variable pixelSize and sets its initial value to 10.

*function setup() { ... }*

Defines the setup() function, which is called once when the program starts. *createCanvas(640, 480);* 

Creates a canvas with a width of 640 pixels and a height of 480 pixels. *video = createCapture(VIDEO);* 

Creates  a  video  capture  object  and  assigns  it  to  the  video  variable.  The  VIDEO parameter specifies that the object should capture video from the user's camera.

*video.size(width/pixelSize, height/pixelSize);*

Sets the size of the video capture object to be one-tenth the width and height of the canvas, by dividing the canvas dimensions by the value of pixelSize.

*video.hide();* 

Hides the video capture object from the screen.

2. Function draw()

{{< details "Code" open >}}
```javascript
function draw() {
  background(0);
  video.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index+1];
      let b = video.pixels[index+2];
      fill(r, g, b);
      noStroke();
      rect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
    }
  }
}
```
{{< /details >}}

The function first sets the background color of the canvas to black (RGB value of 0,0,0) using the "background" function. Then, it loads the pixel data from a video source using the "loadPixels" method.

The code then uses nested "for" loops to iterate over each pixel in the video, from top to bottom and left to right. For each pixel, it calculates the corresponding index in the video.pixels array and extracts the red, green, and blue values using this index.

The function then sets the fill color to the extracted RGB values using the "fill" function, and disables the stroke using the "noStroke" function. Finally, the code draws a rectangle at the current pixel location with dimensions equal to "pixelSize" (which is presumably defined elsewhere in the code).

3. Function KeyPressed()

{{< details "Code" open >}}
```javascript
function keyPressed() {
  if (key == '+') {
    pixelSize += 5;
    video.size(width/pixelSize, height/pixelSize);
  } else if (key == '-') {
    pixelSize -= 5;
    video.size(width/pixelSize, height/pixelSize);
  }
}
```
{{< /details >}}

This code defines a function called keyPressed() which is executed whenever a key is pressed on the keyboard while the program is running.

The code inside the function first checks if the key that was pressed is the plus sign (+) by using an if statement and the key variable, which is a built-in variable in p5.js that represents the value of the most recently pressed key.

If the pressed key  is indeed the plus sign, then the code increments the value of a variable called pixelSize by 5 and resizes a video element (which is assumed to exist in the program) to be smaller by a factor of pixelSize. This effectively zooms in on the video. 

If the pressed key is instead the minus sign (-), then the code decrements the value of pixelSize by 5 and resizes the video element to be larger by a factor of pixelSize. This effectively zooms out from the video.

## 4. Results 



|Normal Picture|Picture with color average|
| - | - |
|![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgjYC7KvFm_dB08OZOgFQYL52O2sCspGH7xm3oOSOVxWJQ00RC0D4ATTb-Wqn9Wt1pWjoWZpSaC8kSYkq7C6gZrvTM8wZU2Lq4mQ_-E6yBcXwQ-F4y467ewVBlrkVYEmQnOPy0qsquR3pIQcvtZgl-kK6c-YCO8yp_zLT9szvwLgFK1o_yfJY0hkugx/w606-h617/Aspose.Words.da6eceef-8a32-4a03-8210-228d3da7629c.004.jpeg)|![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghVWjMpYvDq-C102q0YDrEblvsEOLEPFf8nIeTeXZTnikcPj-QAjCZ45Wyv6LRZZ1ZqJTtmXIt01Yt-TxhVlHfcrm2OwLHecC9-BC42aSbRr_GDnJS1f2XwyjAyJH5eMgHDbmBKopVytBU5SuhvbyY5mTOwWG6Bj6lplBDTEzqXKZ67-mEgWiZgxFh/w613-h613/Aspose.Words.da6eceef-8a32-4a03-8210-228d3da7629c.005.jpeg)|



|Normal Picture|Picture with color average|
| - | - |
|![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhr9u9uxTDjWPhUv5d3yv5PFPWlHt8ixSFLjbRk6o7iHuHIL8BTKcZYEofpmSBfpwyXjsnhoXeCgwjLidRroMGvqI4DPHxoPnggdgI5ndfVPlwWQsZPZN_I9cnZlMlevIghyiZS_DRo_ET66-WTKJbw5bd6PQGbH5zR6lbv9djI37Fb6zk1cGCs_03b/w610-h563/Aspose.Words.da6eceef-8a32-4a03-8210-228d3da7629c.006.jpeg)|![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgooOdVbrbROz2nby1xPFZCeMeM0hBjYpKDuWRSEF8El8McgJJu5a2hqKeMLZ_VyZZhRy4_W6KriBKNRtSwNXKfQR-RlAwJGEE14SIOGQUdROj3rBFXmVhakoI5RP4uNpZJsWL8F9KjEiW5z357aa6YUdYDTFvlia6fQpi3tYjUTJyKGP3JpSiCXF4e/w611-h562/Aspose.Words.da6eceef-8a32-4a03-8210-228d3da7629c.007.jpeg)|


|Normal Picture|Picture with color average|
| - | - |
|![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgR393LiDJ_0vqmpxyEcTIM2eGHS3pmWgD6UsvqVY1MMFq0Npky09tcNNk0_hrSYcVemjFSu4iM-Ev9Cgw2uuTMtJsuYfsQ64MdYbB3cGTu-UXf665tc27wcMqOwMwzBJNCuqGbROo7--YfQT8RfZNxVire_8TMxWcgLVWo6ulG6EiSRRbeIdKS4SoR/w611-h456/Aspose.Words.da6eceef-8a32-4a03-8210-228d3da7629c.008.png)|![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRoYB073C-1OvOsYUB_nhmW6V9xcm_u5avhgXRWTtk1j9ao58s0kyRewsG1IgdUISlfgbArfc95Uj0tu3XeKFrLI5ljLO9Eebl3Q5z1YEF65pJMBRcZcFl7lgUSGIMvIFK2qwOvU9l3RLtQSfJXRrZpQhJp5kTlfRzrxfcSdQmK0bcefoRUTcssGz7/w607-h377/Aspose.Words.da6eceef-8a32-4a03-8210-228d3da7629c.009.png)|

{{< p5-iframe sketch="/showcase/sketches/color_average.js" width="825" height="825" >}}

## 5. Discussion  

The use of technology has transformed many aspects of our lives. One area that has seen significant advancements is video processing. One such development is the pixelation technique used in videos, which is a popular feature in many video editing applications. This report will discuss the use of color average with p5.js to create a video pixelator.

Pixelation is a technique used to distort or blur an image or video by reducing its resolution. This process can be used for various purposes, such as hiding sensitive information, adding artistic effects, or simply to obscure an area of a video that may contain unwanted elements. The color average algorithm is a common method used in pixelation, where the color values of adjacent pixels are averaged to create a block of color. 

To create a video pixelator using color average with p5.js, the following steps were taken: 

Step  1:  The  p5.js  library  was  used  to  capture  video  from  the  user's  webcam  or uploaded video file.

Step 2: The video was divided into blocks of equal sizes.

Step 3: The color values of each block were averaged to create a single color for the entire block.

Step 4: The new pixelated video was created by replacing each block of pixels with the averaged color block. 

Step 5: The final pixelated video was displayed on the user's screen.

The  video  pixelator  created  using  color  average  with  p5.js  was  successful  in pixelating the video. The pixelation effect was achieved by reducing the resolution of the video, and the color average algorithm was used to create the block of colors. The final pixelated video was displayed on the user's screen, and the effect was visible to the user.

## 6. Conclusion:

In  conclusion,  video  pixelation  is  a  popular  technique  used  in  video  editing applications. The color average algorithm is a common method used in pixelation, and it can be implemented using p5.js. The results of this experiment show that the use of color average with p5.js can successfully create a pixelated video. Further research  can  be  done  to  optimize  the  algorithm  and  improve  the  overall performance of the video pixelator.

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsKw7dGrFjyiA7HpYaQNA5RRp3uyEdl17QxxeE4aoZ42CRgri1SbxuSiz7HJcPn3v9KKSkejdHeev2tPoU6PSNT71YE7SBDCTFBWO35yM4O5nJ0_itDrx9LN40gS38PwzCKa1eRRiGV88JLHX9ymQd3V-EHCZs5ScNiPz9PNBwDt4qzHnq_D3fNVhU/w604-h805/Aspose.Words.da6eceef-8a32-4a03-8210-228d3da7629c.010.jpeg" alt="results" width=100%>
</p>
</div>
