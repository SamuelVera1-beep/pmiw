// TP2 - Mini juego: "Lluvia de cuchillos"
// Bautista Zarzoso 125708/2, Samuel Vera 122941/6
// 

let juego;

// IMAGENES
let fondo;
let imgQuieto = [];   //  idle
let imgCaminar = [];  // walking
let imgMuerte, imgVictoria; // ganar, perder
let imgCuchillo; 
let imgCorazon, imgCorazonPerdido; // vida

// SONIDOS
let musica, sonidoDanio, sonidoGanar, sonidoPerder;

function preload() {
  fondo = loadImage('assets/fondo.png');

  // frames del personaje
  imgQuieto.push(loadImage('assets/idle.png'));
  imgQuieto.push(loadImage('assets/idle1.png'));

  imgCaminar.push(loadImage('assets/walking.png'));
  for (let i = 1; i < 6; i++) {
    imgCaminar.push(loadImage('assets/walking' + i + '.png'));
  }

  imgMuerte = loadImage('assets/muerte.png');
  imgVictoria = loadImage('assets/victoria.png');
  imgCuchillo = loadImage('assets/cuchillo.png');
  imgCorazon = loadImage('assets/corazon.png');
  imgCorazonPerdido = loadImage('assets/corazonperdido.png');

  musica = loadSound('assets/loop.mp3');
  sonidoDanio = loadSound('assets/danio.mp3');
  sonidoGanar = loadSound('assets/ganar.mp3');
  sonidoPerder = loadSound('assets/perder.mp3');
}

function setup() {
  createCanvas(800, 400);

  fondo.resize(800, 450);    
  imgCuchillo.resize(0, 50); 

  noSmooth();

  musica.setVolume(1);

  juego = new Juego();
}

function draw() {
  juego.actualizar();
  juego.dibujar();
}

function mousePressed() {
  juego.mousePressed();
}

function keyPressed() {
  juego.keyPressed();
}
