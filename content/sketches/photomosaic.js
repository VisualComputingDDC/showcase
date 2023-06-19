let img;
let tileSize = 10; // Size of each mosaic tile
let colorImages = []; // Array to store the color images

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

function setup() {
  createCanvas(img.width, img.height);
  noLoop(); // Only draw once
}

function draw() {
  background(255);

  // Iterate over the image pixels and draw mosaic tiles
  for (let y = 0; y < img.height; y += tileSize) {
    for (let x = 0; x < img.width; x += tileSize) {
      // Get the average color of the tile
      let tileColor = getAverageColor(x, y, tileSize);
      
      if (tileColor.toString() === color(255, 255, 0).toString()) {
        image(colorImages[0], x, y, tileSize, tileSize);
      } else if (tileColor.toString() === color(0, 255, 255).toString()) {
        image(colorImages[1], x, y, tileSize, tileSize);
      } else if (tileColor.toString() === color(0, 0, 255).toString()) {
        image(colorImages[2], x, y, tileSize, tileSize);
      } else if (tileColor.toString() === color(255).toString()) {
        image(colorImages[3], x, y, tileSize, tileSize);
      } else if (tileColor.toString() === color(139, 69, 19).toString()) {
        image(colorImages[4], x, y, tileSize, tileSize);
      } else if (tileColor.toString() === color(128).toString()) {
        image(colorImages[5], x, y, tileSize, tileSize);
      } else if (tileColor.toString() === color(128, 0, 128).toString()) {
        image(colorImages[6], x, y, tileSize, tileSize);
      } else if (tileColor.toString() === color(255, 165, 0).toString()) {
        image(colorImages[7], x, y, tileSize, tileSize);
      } else if (tileColor.toString() === color(0).toString()) {
        image(colorImages[8], x, y, tileSize, tileSize);
      } else if (tileColor.toString() === color(255, 0, 0).toString()) {
        image(colorImages[9], x, y, tileSize, tileSize);
      } else if (tileColor.toString() === color(255, 192, 203).toString()) {
        image(colorImages[10], x, y, tileSize, tileSize);
      } else if (tileColor.toString() === color(0, 255, 0).toString()) {
        image(colorImages[11], x, y, tileSize, tileSize);
      }
    }
  }
}

function getAverageColor(x, y, tileSize) {
  let pixelColors = [];
  let count = 0;

  // Collect the pixel colors within the tile
  for (let i = 0; i < tileSize; i++) {
    for (let j = 0; j < tileSize; j++) {
      let pixelColor = img.get(x + i, y + j);
      pixelColors.push(pixelColor);
      count++;
    }
  }

  // Calculate the average color values
  let rTotal = 0;
  let gTotal = 0;
  let bTotal = 0;
  for (let i = 0; i < pixelColors.length; i++) {
    rTotal += red(pixelColors[i]);
    gTotal += green(pixelColors[i]);
    bTotal += blue(pixelColors[i]);
  }
  let r = rTotal / count;
  let g = gTotal / count;
  let b = bTotal / count;

  // Determine the closest predefined color
  let colors = [
    color(255, 255, 0),  // amarillo
    color(0, 255, 255),  // azul claro
    color(0, 0, 255),    // azul oscuro
    color(255),          // blanco
    color(139, 69, 19),  // cafe
    color(128),          // gris
    color(128, 0, 128),  // morado
    color(255, 165, 0),  // naranja
    color(0),            // negro
    color(255, 0, 0),    // rojo
    color(255, 192, 203),// rosado
    color(0, 255, 0),    // verde
  ];

  let closestColor = colors[0];
  let closestDistance = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < colors.length; i++) {
    let distance = colorDistance(colors[i], color(r, g, b));
    if (distance < closestDistance) {
      closestColor = colors[i];
      closestDistance = distance;
    }
  }

  return closestColor;
}

// Función para calcular la distancia entre dos colores en el espacio RGB
function colorDistance(c1, c2) {
  let rDiff = red(c1) - red(c2);
  let gDiff = green(c1) - green(c2);
  let bDiff = blue(c1) - blue(c2);
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}