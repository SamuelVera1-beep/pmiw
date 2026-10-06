//arrays
let personajeIdle = [];
let personajeForward = [];
let personajeTurn = [];
let imgFondo;

let estadoActual = "ANIMACION";

//posicion
let posX = 50; //horizontal
let posY = 360; //vertical

let tiempoEstado = 0;

let dioVuelta = false;

let escPersonaje = 0.5;

let anchoSprite = 400; 
let altoSprite = 450;  // 

function preload() {
  imgFondo = loadImage("assets/fondo.png");

  for (let i = 0; i < 19; i++) {
    personajeIdle[i] = loadImage("assets/idle" + i + ".png");
  }

  for (let i = 0; i < 3; i++) {
    personajeTurn[i] = loadImage("assets/turn" + i + ".png");
  }

  for (let i = 0; i < 11; i++) {
    personajeForward[i] = loadImage("assets/walkforward" + i + ".png");
  }
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255);
  imageMode(CORNER);
  image(imgFondo, 0, 0, width, height);

  switch (estadoActual) {
    case "ANIMACION":
      reproducirAnimacion(personajeIdle, posX, posY, 10, escPersonaje);
      tiempoEstado++;

      if (tiempoEstado > 120) {
        cambiarEstadoAutomatico("TURN");
      }
      break;

    case "TURN":
      reproducirAnimacion(personajeTurn, posX, posY, 15, escPersonaje);
      tiempoEstado++;

      if (tiempoEstado > 70) {
        cambiarEstadoAutomatico("FORWARD");
      }
      break;

    case "FORWARD":
      reproducirAnimacion(personajeForward, posX, posY, 5, escPersonaje);
      posX += 4;

      if (posX > width + 100) {
        posX = -100;
        dioVuelta = true;
      }

      if (dioVuelta === true && posX >= 100) {
        posX = 100;
        dioVuelta = false;
        cambiarEstadoAutomatico("ANIMACION");
      }
      break;
  }
}

//fun propia 1
function reproducirAnimacion(arreglo, x, y, velocidad, miEsc) {
  
  let frameActual = calcularFrame(arreglo.length, velocidad);
  let img = arreglo[frameActual];

  if (img) {
    image(img, x, y, anchoSprite * miEsc, altoSprite * miEsc);
  }
}

//fun propia 2 con parametro
function calcularFrame(cantidadFrames, velocidad) {
  
  let frame = floor(frameCount / velocidad) % cantidadFrames;

  return frame;
}

//fun propia 3 c/ parametro
function cambiarEstadoAutomatico(nuevoEstado) {
  estadoActual = nuevoEstado; 
  tiempoEstado = 0;
}

function keyPressed() {

  if (key === "r"|| key == "R") {
    estadoActual = "ANIMACION";
    posX = 100;
    tiempoEstado = 0;
    dioVuelta = false;
  }
}