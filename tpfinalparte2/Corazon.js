
class Corazon {

  constructor(imgLleno, imgVacio, x, y) {
    this.imgLleno = imgLleno;
    this.imgVacio = imgVacio;
    this.x = x;
    this.y = y;
    this.escala = 2; 
    this.estaLleno = true;
  }

  vaciar() {
    this.estaLleno = false;
  }

  llenar() {
    this.estaLleno = true;
  }

  dibujar() {
    let img = this.estaLleno ? this.imgLleno : this.imgVacio;
    image(img, this.x, this.y, img.width * this.escala, img.height * this.escala);
  }
}
