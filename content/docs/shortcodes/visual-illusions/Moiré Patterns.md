**Moiré Patterns**

1. Introduction

In mathematics, physics, and art, moiré patterns or moiré fringes are large-scale interference patterns that can be produced when a partially opaque ruled pattern with  transparent  gaps  is  overlaid  on  another  similar  pattern.  For  the  moiré interference  pattern  to  appear,  the  two  patterns  must  not  be  completely identical, but rather displaced, rotated, or have slightly different pitch[^1].  

We decided to study these patterns because of their strong relationship with Masking, a phenomenon of visual perception occurring when the visibility of one image (target) is reduced by the presence of another image (mask)[^2]. In our case, the target and the mask can be lines or shapes.

In  order  to  visualize  different  illusions  that  can  be  generated  from  these patterns, we created 4 different programs that allow us to represent Moiré Lines and Moiré Shapes, types of Moiré patterns that will be explained in more detail in the Literature Review/Background section.

Additionally,  the  generated  codes  will  be  described  in  the  Methods  section, followed by an analysis of the results, a discussion of these results and finally, the conclusions obtained will be shown.

2. Literature Review/Background

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
3. Methods. 
1. *First Program - Kinegram.* 

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjTi9pox-nBdJJLvMMyScQTZwEM7cQfpmagz7t936RpaCPAFaUZf46CljiXvNXrGXg-LJ4xtpU3qR1GbbULTzm7OuHpvQf26aaVOSmksrCx7F-Y16eUC6fs-EqymCHyZky3389XW_18z6QOsl-ndEkxBYnIR3YK8wKOL50ULg5dMql3QE6F1oOte_DU/w606-h581/Imagen5.png" alt="draw" width=100%>
</p>
</div>

In the preload() function, the image [9] to be used to display the kinegram is loaded. 

In the setup() function, the canvas on which the animation will be generated is generated.

In the draw() function, the animation image is drawn. In addition, a mesh of lines spaced between them is defined, for this, a while loop is used that generates a line every 9 pixels, with a thickness of 5 and a height of 250 pixels, the location on the X axis of these depends on the location of the pointer on the X axis, thus generating a mesh on the figure that moves with the location of the pointer on the canvas.

2. *Second Program - Circles.* 

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhaRPzgVlI8Lzi6UPtTO1Jn_-RVD6WqJpQ2bWok4RqcpCeiYDxubO4PUWVUZFByfyp3H-Vla9onoBqY-LQ8NuRRO3KudiULGy9klTSx5cgLeQ_aO1B_DqjYlD6IPC23g06fmBWVzN9vFsSL2PCfiOUJmnaJF2q6fgyIEn9R68i4su5ZcrC5WL6XM3b4/w606-h824/Imagen6.png" alt="draw" width=100%>
</p>
</div>

In this program, we define the setup() function, here we just define the attributes of the circles that are going to be drawn in the draw() function.

In the draw function(), we define the variables xx and yy. These ones represent the location of four ellipses but their values will be changed to the negative values in some cases, in this way, we generate four different initial locations for some  ellipses.  For  this,  we  are  using  the  functions  sin(radians(angle))  and cos(radians(angle)),  so  we  can  change  the  value  of  the  angle  each  frame, generating sinusoidal and cosinusoidal translations of the circles, thus creating a smooth animation.

Finally, we use a for cycle to draw the four initial circles and some more around them,  by  incrementing  the  diameter  of  them  until  a  maximum  diameter  is reached. 

3. *Third Program - Lines.* 

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8R3tQ1CnIfSkaTAZj89aFRCY1QtksvtNZbBDwu4pEqBFp4SQx2HOVPYQv37innf483EE-59bKav_Ga7bm0yyaLlh-GVTF-Wq032weNsTVlOp8ZTnMtmNzjFZSQA6ijSKopXWB-tt7ADOnYgMFoUvBRVv-arg3mjYso2vE7K0RrauNFkpGR_3Urwox/w610-h568/Imagen7.png" alt="draw" width=100%>
</p>
</div>

In this program, we draw 2 meshes of lines in the draw() function. They are both horizontal lines but their Stroke Weight differs so the illusion of movement can be generated. Additionally, in the second while, where one of the meshes is drawn, the Y-axis coordinates move with the location of the pointer on this axis. In this way, one of the grids will overlap the other with the movement of the pointer that the user wishes.

*3.4 Fourth Program - Lines and Circles.* 

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgr30RDagfwan1t08qYcxkt8t4gn2bs8Ibxj4qhGApCKQVmRGMggtEdn8s89fhEB7L3gwRS75BZ9BFNgLFSDOwXhd5By3YEBfnfvlXHAfCFifP9scUCCunK-MtWzpdIRov3bpLyLDebYsJawDgavDU7DNK_mVC62Xvh_xoRIsnTxNgyeN0wXwiaSJ7F/w612-h542/Imagen8.png" alt="draw" width=100%>
</p>
</div>

In the last program, we define two variables: *spacing* and *angle*, the first one will define the distance between each line and the second one will define the angle of movement that the lines will have.

In the draw() function is where the lines are drawn. We use two for loops to iterate through every possible position on the grid defined by spacing. For each pair of coordinates (x, y) in the grid, we calculate the distance d between that position and the center of the canvas. We then use the map() function to convert that distance into an offset value that will be applied to the position of the line on the y-axis or x-axis. Using the line() function, we draw different lines that move on each frame based on the offset value, thus generating an animation with Moiré patterns.

4. Results 
- *First Program - Kinegram* 

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_CKBv5EPw8pLa6zvVs9mK9qR-_93IVvoCf0Ds5ZNRwUX23VDO56z_UDhuSHT3r97py0GCS_qehVrdqy_1DbyRJ-xMB9CQZEwXIFmAgEQfwX5AY68SexoAKKZrnCevvl_eNBUrKFGL71ctr-kLV0kN5wagzCE1mmvsggCyt885dUUv4CvfZwqDfVPk/w591-h323/Aspose.Words.9f2f5543-cd9b-4206-80a7-b781e94c9a39.005.png" alt="draw" width=100%>
</p>
</div>

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQudteJXukXfTxK-lP3ehxkB9xZtGc0m5nPeCBTeqamRHxLUSCHjuujITCrcCL30w-oS1SAaOTZSB3hMzuBaYCBIRLYBm2fI36FGjkVE9L-mwAyoWx8-ctLfi7vJ1sMIHpgc85P-1tB6OcYh2tI7tLfJWiRtUt3xNW87bBKI9S_u59fjloFcNUREav/w597-h319/Aspose.Words.9f2f5543-cd9b-4206-80a7-b781e94c9a39.006.png" alt="draw" width=100%>
</p>
</div>

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxFmjoPX3IldOVUHGAQH0vBD9iKZvrT4JMvxvxAqNuqfbNFSLqj_bWYbHQaqiuc-iadi5S7aLR_k5p-vM2lN_HPdduhrI4ZljV7q3rPttJI10tCpi8iIW78NjQWu7jhv_c7yxoXGShw3_P_KOZCFsmuheGNkLJqbQ2OeIpDf7oOFZUoYMIpR_t0y4K/w582-h310/Aspose.Words.9f2f5543-cd9b-4206-80a7-b781e94c9a39.007.png" alt="draw" width=100%>
</p>
</div>

- *Second Program - Circles* 

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3KxIx-nrNgBMA37sonhOvxZI1rn0ClJFQJIIMnctwliV3UJ0y-eMBnE6BE2y42LFFRlZ1qmzk3jQVxwq3Yu8YV1w41rSYzvPW7MHZQvYx2hUOiCxnB8kjazgY7DJtFRuS_7NLgjrLs4gdJUsQebFsMp78v116vT-3xHLG-IPhMyjFudn8Y1WDW4bN/w576-h415/Aspose.Words.9f2f5543-cd9b-4206-80a7-b781e94c9a39.008.jpeg" alt="draw" width=100%>
</p>
</div>

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjRZY6gUjKgvingYuMuaMEh2D0AFmJJt66E_uEboXyhhCzuYSAsSvvfnBqRHOVFwtlxzNK7demq12cHuBP-Arhbt2sT9f8c7e6PiVZU-8Ggwfo4Skhx2C5aa6fIFMYinhLPqXgiHysLeCUgz-U8cTYVqXNvGdEnhjyFRDIT-RU31HzGBcGDcA7Te39w/w576-h415/Aspose.Words.9f2f5543-cd9b-4206-80a7-b781e94c9a39.009.jpeg" alt="draw" width=100%>
</p>
</div>

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitVUJ1cSF9PidMaSaK0sEBRIBKrM4fcZH68j1TmMUMdfsyqEAl6RjbqJ8YPzsm3UnPYPn_4BpgyZpAaTBBz9VCieW4U-Uidsv46PwWdOqjyOkcPkUhkCHkUdtRa9Hfy9NaKZFG-fcL8AdyLkVycFEG49aah4XKRTEw-KRVAECPfFm0ncTn_or8H4mt/w582-h421/Aspose.Words.9f2f5543-cd9b-4206-80a7-b781e94c9a39.010.png" alt="draw" width=100%>
</p>
</div>

- *Third Program - Lines* 

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnNwucaVzdIQ0sx1cDtHdfVi3MJ_B4e0fBUzFyLS0b03zj_BeReaGI_llVfZGTdiaKjBNW6i1PdwJohPvlhz2dZZq4sUS_zjmTXidG98PqbWp-M8D9p9fWFc2ImpOLkWM-ttGF8hBzdHKQxd-aoD2pzfZ_UFjXCTVPKa5etOCDE1Na8G-7drLLkR8I/w585-h694/Aspose.Words.9f2f5543-cd9b-4206-80a7-b781e94c9a39.011.png" alt="draw" width=100%>
</p>
</div>

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-kVZKVZaJc0jnKh-40u72YUArFSldNO1Szmx1Y_WNo0WAeZJvs7Sk5hRT-RO6aqSYAXjFrr4bY5R5XaroBPuHiXdXGquvGzpEyRI84pAzdGALDTziXkhcBUXlvJFFA-abllGi4V0P27Fflwe_WgrO8aadHyR1H4K041mFLE_8jW6qPzCP82HzO7J7/w587-h717/Aspose.Words.9f2f5543-cd9b-4206-80a7-b781e94c9a39.012.png" alt="draw" width=100%>
</p>
</div>

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNDt3oxaKOjx9PxGmMBAJaExFT4BI7j6Eqp2ztpRz0x-jBtq8WEngC7_b-lqPlixpeFBIjkJCS9Sw5xNuwY67EUBWEHzpL80qta9eiJ79zaaGBeYbk0sgS8Oxxk6QnHrcDfeM4FdinjtcIT3fgvTCXhv1wM-9LrTjLXEHT7i3s5DMxYN956_fjDo_p/w578-h685/Aspose.Words.9f2f5543-cd9b-4206-80a7-b781e94c9a39.013.png" alt="draw" width=100%>
</p>
</div>

- *Fourth Program - Lines and Circles* 

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgu7Cmpss4iZvPCSXXZpXq0fjwom2C2b3RAsgcQWH8ZrvMlIBDjwyNFH92QVGxuL4cdWJXwwLsHMDSlq6BsZ61-hkBpOlrwEq97ZlU7yZKqjJ0A9J88DBZo33ADe16ecIok0DBnwx1msOnjONIpKM7MaHv0_Zy-0OYxk36ULd-OrCbRn6pBdaeF0y6f/w587-h591/Aspose.Words.9f2f5543-cd9b-4206-80a7-b781e94c9a39.014.png" alt="draw" width=100%>
</p>
</div>

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgWoZeJKlxSoQmwsBTcLlht37F-A8FdR4xNg2lPe_Abnfe6H7ydYKFa5MKI6uie1vxvIKFt6H2AmirnsPtpafdc7M8-exUOa7HuaeWybXz_JNPQja_YYnoSsXppmU-ZRnjgRA5u6PudGRgJNuNcd_ysPUzBiD8l3kn7wG0xG5fpjodWsusUC4AuC05R/w587-h587/Aspose.Words.9f2f5543-cd9b-4206-80a7-b781e94c9a39.015.png" alt="draw" width=100%>
</p>
</div>

<div>
<p style = 'text-align:center;'>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIrlODEg2lYjX__ahuhsvk3aBgIgNAesuaBOJkXnUAWldXZ7Ea9y7QNax0ZSMCYTj0xgJjm-ABHef8zbt5CoDKt2w9jHSDyAmtCEmhY2MsuLVChjiOdRiPn8UThi0xMJCHFBW9E2659ZCB_l5gOX1OiWtQ-cXGvRsP3rAogumqBkYVSrfXPXTKvTw6/w591-h591/Aspose.Words.9f2f5543-cd9b-4206-80a7-b781e94c9a39.016.png" alt="draw" width=100%>
</p>
</div>

5. Discussion

With these programs we can see some examples of how Moiré patterns can be produced. Specifically, the Second, Third and Fourth Program, are all examples of Lines Moiré, and we can see how they can be really simple but effective (Third) or way more complex (Second and Fourth). Additionally, the First Program is an example of a Kinegram, an artistic product done using Shape Moiré.

These examples are just simple representations of these patterns, but we could use them to create complex animations, fixing undesired patterns on screens and  TV,  or  even  marine  navigation,  as  mentioned  in  the  Literature Review/Background section.

6. Conclusion

In  conclusion,  Moiré  patterns  appear  in  different  fields  such  as  animation, currency,  image  processing,  etc.  There  are two  main types  of patterns,  Line Moiré and Shape Moiré. In the first, only lines are used while in the second, shapes and lines appear. Finally, the kinegram is an artistic application created from Shape Moiré.

[^1]: Moiré Pattern. Wikipedia (2023). 
[^2]: Visual Masking. Visual Computing by J. Charalambos (2023-1). 
[^3]: A few scanning tips. Scantips by W. Fulton. (1997 - 2010). 
[^4]: A Universal Moiré Effect and Application in X-Ray Phase-Contrast Imaging by H. Miao, A. Panna, A. Gomella, E. Bennett, S. Znati, L. Chen, and H. Wen (2016) 
[^5]: The basics of line moire patterns and optical speedup by E. Gabrielyan (2007). 
[^6]: Shape moiré. HandWiki (2023). 
[^7]: Kinegrams, Art in Motion! Expect the unexpected by Gianni A. (2023). 
[^8]: Moiré Pattern - Description and Applications. AZO Optics. (2023). 