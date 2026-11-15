
class Cuchillo {

  constructor(img, objetivoX, objetivoY, velocidad) {
    this.img = img;
    this.ancho = img.width;
    this.alto = img.height;

    this.x = constrain(objetivoX + random(-250, 250), 20, width - 20);
    this.y = -this.alto;

    let destinoX = objetivoX + random(-40, 40);
    this.angulo = atan2(objetivoY - this.y, destinoX - this.x);
    this.vx = cos(this.angulo) * velocidad;
    this.vy = sin(this.angulo) * velocidad;
  }

  mover() {
    this.x += this.vx;
    this.y += this.vy;
  }

  puntosDeImpacto() {
    let dx = cos(this.angulo);
    let dy = sin(this.angulo);
    let proporciones = [0.45, 0.3, 0.15]; 
    let puntos = [];
    for (let i = 0; i < proporciones.length; i++) {
      let d = this.alto * proporciones[i];
      puntos.push(createVector(this.x + dx * d, this.y + dy * d));
    }
    return puntos;
  }

  fueraDePantalla() {
    return this.y - this.alto > height || this.x < -this.alto || this.x > width + this.alto;
  }

  dibujar() {
    push();
    translate(this.x, this.y);
    rotate(this.angulo - HALF_PI);
    imageMode(CENTER);
    image(this.img, 0, 0);
    pop();
  }
}
