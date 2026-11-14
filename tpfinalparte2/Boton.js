
class Boton {

  constructor(texto, x, y, ancho, alto, accion) {
    this.texto = texto;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.accion = accion; 
  }

  estaEncima() {
    return mouseX > this.x - this.ancho / 2 && mouseX < this.x + this.ancho / 2 &&
           mouseY > this.y - this.alto / 2 && mouseY < this.y + this.alto / 2;
  }

  dibujar() {
    push();
    rectMode(CENTER);
    stroke(255);
    strokeWeight(2);
    if (this.estaEncima()) fill(200, 30, 30);
    else fill(0, 180);
    rect(this.x, this.y, this.ancho, this.alto, 8);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text(this.texto, this.x, this.y);
    pop();
  }
}
