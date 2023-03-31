# Moiré Patterns

## 1. Introduction

In mathematics, physics, and art, moiré patterns or moiré fringes are large-scale interference patterns that can be produced when a partially opaque ruled pattern with  transparent  gaps  is  overlaid  on  another  similar  pattern.  For  the  moiré interference  pattern  to  appear,  the  two  patterns  must  not  be  completely identical, but rather displaced, rotated, or have slightly different pitch[^1].  

We decided to study these patterns because of their strong relationship with Masking, a phenomenon of visual perception occurring when the visibility of one image (target) is reduced by the presence of another image (mask)[^2]. In our case, the target and the mask can be lines or shapes.

In  order  to  visualize  different  illusions  that  can  be  generated  from  these patterns, we created 4 different programs that allow us to represent Moiré Lines and Moiré Shapes, types of Moiré patterns that will be explained in more detail in the Literature Review/Background section.

Additionally,  the  generated  codes  will  be  described  in  the  Methods  section, followed by an analysis of the results, a discussion of these results and finally, the conclusions obtained will be shown.

## 2. Literature Review/Background

Moiré  patterns  are  often  an  artifact  of  images  produced  by  various  digital imaging  and  computer  graphics  techniques,  for  example  when  scanning  a halftone picture or ray tracing a checkered plane[^3]. More frequently, the moiré effect occurs between overlapping transparent objects[^4]. 

There are two principal types of Moiré patterns, Lines Moiré and Shapes Moirés:

1. The case when layer patterns comprise straight or curved lines is called *line moiré*[^5]. When moving the layer patterns, the moiré patterns transform or move at a faster speed. This effect is called optical moiré speedup.
1. *Shape moiré* is one type of moiré patterns demonstrating the phenomenon of moiré magnification. 1D shape moiré is the particular simplified case of 2D  shape  moiré.  One-dimensional  patterns  may  appear  when superimposing an opaque layer containing tiny horizontal transparent lines on top of a layer containing a complex shape which is periodically repeating along the vertical axis[^6]. 

An important application of Moiré Patterns in art is the kinegram. Kinegrams cleverly  combine  the  visual  effects  of  moiré  patterns  with  the  animation technique of the zoetrope.

The animated sequence is created when the complex image - the Kinegram - is viewed through the acetate overlay with a solid black pattern printed on it. The blank spaces of the pattern being transparent, as the overlay is slid across the Kinegram, different sections of the Kinegram become visible. Our brain links this succession of appearing images together, creating the illusion of fluid motion[^7]. 

Moiré patterns are useful to represent fluid flow and potential fields. They are also  used  to  solve  problems  in  optics,  wave  motion,  crystallography, mathematics, stress analysis, and psychology of perception.

Moiré patterns can find use in the following applications[^8]: 

- Animation 
- Currency 
- Printing full-color images
- TV screens and photographs
- Marine navigation
- Strain measurement
- Image processing

## 3. Methods. 

### 3.1. *First Program - Kinegram.* 
{{< details "Code" open >}}
```javascript
let img;

function preload() {
  img = loadImage('../../../../sketches/kinegram_animal.jpg');
}

function setup() {
  createCanvas(550, 300);
}

function draw() {
  strokeWeight(5);
  background(255);
  image(img, 0, -50, 500, 400);
  
  let c = 0
  while (c < 500) {
    line(c + mouseX - 250, 20, c + mouseX - 250, 270)
    c += 9
  }
}
```
{{< /details >}}

In the preload() function, the image [9] to be used to display the kinegram is loaded. 

In the setup() function, the canvas on which the animation will be generated is generated.

In the draw() function, the animation image is drawn. In addition, a mesh of lines spaced between them is defined, for this, a while loop is used that generates a line every 9 pixels, with a thickness of 5 and a height of 250 pixels, the location on the X axis of these depends on the location of the pointer on the X axis, thus generating a mesh on the figure that moves with the location of the pointer on the canvas.

### 3.2. *Second Program - Circles.* 
{{< details "Code" open >}}
```javascript
let diaMin = 20;
let diaMax = 550;
let diaStep = 6;

let angle = 0;

function setup() {
  createCanvas(550, 400);
  
  noFill()
  stroke(0)
  strokeWeight(diaStep/4)
}

function draw() {
  background(255);
  
  var xx = sin(radians(angle))*100;
  var yy = cos(radians(angle))*100;
  
  translate(width/2, height/2);
  for (var dia=diaMin; dia<diaMax; dia+=diaStep) {
    ellipse(-xx, yy, dia, dia);
    ellipse(xx, yy, dia, dia);
    ellipse(-xx, -yy, dia, dia);
    ellipse(xx, -yy, dia, dia);
  }
  angle = angle + 1;
}
```
{{< /details >}}

In this program, we define the setup() function, here we just define the attributes of the circles that are going to be drawn in the draw() function.

In the draw function(), we define the variables xx and yy. These ones represent the location of four ellipses but their values will be changed to the negative values in some cases, in this way, we generate four different initial locations for some  ellipses.  For  this,  we  are  using  the  functions  sin(radians(angle))  and cos(radians(angle)),  so  we  can  change  the  value  of  the  angle  each  frame, generating sinusoidal and cosinusoidal translations of the circles, thus creating a smooth animation.

Finally, we use a for cycle to draw the four initial circles and some more around them,  by  incrementing  the  diameter  of  them  until  a  maximum  diameter  is reached. 

### 3.3. *Third Program - Lines.* 

{{< details "Code" open >}}
```javascript
function setup() {
  createCanvas(335, 400);
}

function draw() {  
  background(255);
  
  strokeWeight(4);
  let c1 = 0
  while (c1 < 300) {
    line(20, c1 + 150, 270, c1 + 150)
    c1 += 7
  }
  
  strokeWeight(3);
  let c2 = 0
  while (c2 < 300) {
    line(60, c2 + mouseY - 150, 310, c2 + mouseY - 150)
    c2 += 6
  }
}
```
{{< /details >}}

In this program, we draw 2 meshes of lines in the draw() function. They are both horizontal lines but their Stroke Weight differs so the illusion of movement can be generated. Additionally, in the second while, where one of the meshes is drawn, the Y-axis coordinates move with the location of the pointer on this axis. In this way, one of the grids will overlap the other with the movement of the pointer that the user wishes.

### 3.4. *Fourth Program - Lines and Circles.* 

{{< details "Code" open >}}
```javascript
let spacing = 7;
let angle = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  stroke(0);
  strokeWeight(0.75);
  
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      let d = dist(x, y, width/2, height/2);
      let offset = map(d, 0, dist(0, 0, width/2, height/2), -angle, angle);
      line(x - offset, y + offset, x - offset, y - offset);
      line(x + offset, y + offset, x + offset, y - offset);
    }
  }
  
  if (angle > 70) {
    angle = 0
  }
  
  angle += 0.05;
}
```
{{< /details >}}

In the last program, we define two variables: *spacing* and *angle*, the first one will define the distance between each line and the second one will define the angle of movement that the lines will have.

In the draw() function is where the lines are drawn. We use two for loops to iterate through every possible position on the grid defined by spacing. For each pair of coordinates (x, y) in the grid, we calculate the distance d between that position and the center of the canvas. We then use the map() function to convert that distance into an offset value that will be applied to the position of the line on the y-axis or x-axis. Using the line() function, we draw different lines that move on each frame based on the offset value, thus generating an animation with Moiré patterns.

## 4. Results 
- *First Program - Kinegram* 
{{< p5-iframe sketch="/showcase/sketches/kinegram.js" width="600" height="324" >}}

- *Second Program - Circles* 
{{< p5-iframe sketch="/showcase/sketches/circles.js" width="570" height="425" >}}

- *Third Program - Lines*

{{< p5-iframe sketch="/showcase/sketches/lines.js" width="350" height="425" >}}

- *Fourth Program - Lines and Circles* 

{{< p5-iframe sketch="/showcase/sketches/lines_circles.js" width="425" height="425" >}}

## 5. Discussion

With these programs we can see some examples of how Moiré patterns can be produced. Specifically, the Second, Third and Fourth Program, are all examples of Lines Moiré, and we can see how they can be really simple but effective (Third) or way more complex (Second and Fourth). Additionally, the First Program is an example of a Kinegram, an artistic product done using Shape Moiré.

These examples are just simple representations of these patterns, but we could use them to create complex animations, fixing undesired patterns on screens and  TV,  or  even  marine  navigation,  as  mentioned  in  the  Literature Review/Background section.

## 6. Conclusion

In  conclusion,  Moiré  patterns  appear  in  different  fields  such  as  animation, currency,  image  processing,  etc.  There  are two  main types  of patterns,  Line Moiré and Shape Moiré. In the first, only lines are used while in the second, shapes and lines appear. Finally, the kinegram is an artistic application created from Shape Moiré.

[^1]: Moiré Pattern. Wikipedia (2023). 
[^2]: Visual Masking. Visual Computing by J. Charalambos (2023-1). 
[^3]: A few scanning tips. Scantips by W. Fulton. (1997 - 2010). 
[^4]: A Universal Moiré Effect and Application in X-Ray Phase-Contrast Imaging by H. Miao, A. Panna, A. Gomella, E. Bennett, S. Znati, L. Chen, and H. Wen (2016) 
[^5]: The basics of line moire patterns and optical speedup by E. Gabrielyan (2007). 
[^6]: Shape moiré. HandWiki (2023). 
[^7]: Kinegrams, Art in Motion! Expect the unexpected by Gianni A. (2023). 
[^8]: Moiré Pattern - Description and Applications. AZO Optics. (2023). 