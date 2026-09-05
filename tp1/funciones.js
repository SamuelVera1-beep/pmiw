function obtenerFrame(animacion, posicion) {

  return animacion[posicion];

}


function cantidadFrames(animacion) {

  return animacion.length;

}


function reset() {

  estadoP = IDLE;

  n = 0;

  repeticionesIdle = 0;

  x = 150;

  tiempoAnterior = millis();

}
