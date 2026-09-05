//arrays
let personajeIdle = [];
let personajeForward = [];
let personajeBackward = [];

//estados
let IDLE = 0;
let FORWARD = 1;
let BACKWARD = 2;
let estadoP = IDLE;

//frame
let n = 0;

//rep idle
let repeticionesIdle = 0;

//tiempo
let tiempoAnterior = 0;

//Tiempo entre cada frame
let velocidad = 100;

//posicion del pj
let x = 150;
let y = 380;

// tamaño pj
let anchoPersonaje = 194;
let altoPersonaje = 240;

function preload() {
  // IDLE
  for (let i = 0; i < 20; i++) {
    personajeIdle.push(loadImage("/sprites/idle filia" + (i + 1) + ".png"));
  }

  // WALK FORWARD
  for (let i = 0; i < 7; i++) {
    personajeForward.push(loadImage('/sprites/walk forward filia' + (i + 1) + '.png'));
  }

  // WALK BACKWARD
  for (let i = 0; i < 22; i++) {
    personajeBackward.push(
      loadImage('/sprites/walk backward filia' + (i + 1) + '.png')
    );
  }
}

function setup() {
  createCanva(800, 600);
  imageMode(CENTER);
  tiempoAnterior = millis();
}

function draw() {
  background(100, 170, 210);
  fill(70, 150, 80);
  rect(0,500,width,100)

switch (estadoP) {

    case IDLE:
      image(
        obtenerFrame(personajeIdle, n),
        x,
        y,
        anchoPersonaje,
        altoPersonaje
      );
    
    //tiempo
      if (
        millis() - tiempoAnterior > velocidad
      ) {

        n++;

        tiempoAnterior = millis();

        if (
          n >= cantidadFrames(personajeIdle)
        ) {


          n = 0;

          repeticionesIdle++;


          if (repeticionesIdle >= 2) {

            cambiarEstado(FORWARD);

            repeticionesIdle = 0;

          }

        }

      }

      break;

    case FORWARD:

      image(
        obtenerFrame(personajeForward, n),
        x,
        y,
        anchoPersonaje,
        altoPersonaje
      );

      //derecha

      x = x + 0.5;


      if (
        millis() - tiempoAnterior > velocidad
      ) {

        n++;

        tiempoAnterior = millis();
        

        if (
          n >= cantidadFrames(personajeForward)
        ) {

          cambiarEstado(IDLE);

          repeticionesIdle = 0;

        }

      }

      break;

    case BACKWARD:

      image(
        obtenerFrame(personajeBackward, n),
        x,
        y,
        anchoPersonaje,
        altoPersonaje
      );

      // izquierda

      x = x - 0.5;

      if (
        millis() - tiempoAnterior > velocidad
      ) {

        n++;

        tiempoAnterior = millis();

        if (
          n >= cantidadFrames(personajeBackward)
        ) {

          cambiarEstado(IDLE);

          repeticionesIdle = 0;

        }

      }

      break;

  }


  if (x > width + anchoPersonaje / 2) {
    x = -anchoPersonaje / 2;
  }

  if (x < -anchoPersonaje / 2) {
    x = width + anchoPersonaje / 2;
  }
}

function keyPressed() {
  if (key == "r" || key == "R") {

    reset();

  }
}
