let img;

function preload() {
  // Carga la imagen desde la carpeta 'images'
  img = loadImage('../../../../images/vangogh.webp');
}

function setup() {
  createCanvas(825, 825);
  // Dibuja la imagen en el lienzo
  image(img, 0, 0);
}