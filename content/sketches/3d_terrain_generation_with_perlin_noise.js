var terrainValues = [];

function setup() { 
  createCanvas(800, 800, WEBGL);

  tam_slider = createSlider(0, 80, 80, 10);
  tam_slider.position(10, 10);
  tam_slider.style('width', '80px');
  tam_slider.style('height', '80px');
  
  mul_slider = createSlider(0, 150, 150, 10);
  mul_slider.position(110, 10);
  mul_slider.style('width', '80px');
  mul_slider.style('height', '80px');
  
  noisy_slider = createSlider(0, 1, 0, 0.1);
  noisy_slider.position(210, 10);
  noisy_slider.style('width', '80px');
  noisy_slider.style('height', '80px');
  
  rotateX_slider = createSlider(-90, 90, 50, 10);
  rotateX_slider.position(10, 60);
  rotateX_slider.style('width', '80px');
  rotateX_slider.style('height', '80px');
  
  rotateY_slider = createSlider(-90, 90, 0, 10);
  rotateY_slider.position(10, 110);
  rotateY_slider.style('width', '80px');
  rotateY_slider.style('height', '80px');
  
  rotateZ_slider = createSlider(-90, 90, 0, 10);
  rotateZ_slider.position(10, 160);
  rotateZ_slider.style('width', '80px');
  rotateZ_slider.style('height', '80px');
  
}

function draw() { 
  angleMode(DEGREES); 
  background(0);
  stroke(128);
  let X = rotateX_slider.value();
  let Y = rotateY_slider.value();
  let Z = rotateZ_slider.value();
  rotateX(X);
  rotateY(Y);
  rotateZ(Z);
  translate(-width/2, -height/2)
  
  let tam = tam_slider.value();
  let mul = mul_slider.value();
  let noisy = noisy_slider.value();
    for (var yy=0; yy<tam; yy++){
      terrainValues.push([]);
      for (var xx=0; xx<tam; xx++){
      terrainValues[yy][xx] = map(noise(xx*noisy,yy*noisy), 0, 1, -mul, mul);
    }
  }

  
  for (var y=0; y<tam; y++){
    beginShape (TRIANGLE_STRIP) 
    for (var x=0; x<tam; x++){
      if (terrainValues[y][y] < -50){
        fill('white');
      }else if (terrainValues[y][y] < 0){
        fill('rgb(128,85,128)');
      }else if (terrainValues[y][y] < 50){
        fill('rgb(128,170,128)');
      }else{
        fill('rgb(128,0,128)');
      }
      vertex (x*10, y*10, terrainValues[y][y]); 
      vertex (x*10, (y+1)*10, terrainValues[y][x]);
    } 
    endShape();
  }
}