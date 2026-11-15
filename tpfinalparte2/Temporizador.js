// Cuenta regresiva

class Temporizador {

  constructor(segundos) {
    this.duracion = segundos * 1000;
    this.reiniciar();
  }

  reiniciar() {
    this.transcurrido = 0;
  }

  actualizar(dt) {
    this.transcurrido = min(this.transcurrido + dt, this.duracion);
  }

  restante() {
    return this.duracion - this.transcurrido;
  }

  termino() {
    return this.transcurrido >= this.duracion;
  }

  progreso() {
    return this.transcurrido / this.duracion; 
  }

  formatear(ms, haciaArriba = true) {
    let s = haciaArriba ? ceil(ms / 1000) : floor(ms / 1000);
    return floor(s / 60) + ':' + nf(s % 60, 2);
  }

  dibujar() {
    push();
    textAlign(RIGHT, TOP);
    textStyle(BOLD);
    textSize(30);
    stroke(0);
    strokeWeight(5);
    if (this.restante() <= 10000) fill(255, 60, 60); 
    else fill(255);
    text(this.formatear(this.restante()), width - 16, 12);
    pop();
  }
}
