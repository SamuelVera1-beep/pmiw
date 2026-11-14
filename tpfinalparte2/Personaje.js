// Personaje

class Personaje {

  constructor(framesQuieto, framesCaminar, imgMuerte, imgVictoria) {
    this.framesQuieto = framesQuieto;    
    this.framesCaminar = framesCaminar;  
    this.imgMuerte = imgMuerte;
    this.imgVictoria = imgVictoria;

    this.escala = 2.5 + 10 / 29;   
    this.velocidad = 5;
    this.reiniciar();
  }

  reiniciar() {
    this.x = width / 2;         
    this.piso = height - 50;    
    this.estado = 'quieto';     
    this.direccion = 1;         
    this.frame = 0;
    this.marcaFrame = millis();
    this.invulnerableHasta = 0;
  }

  cambiarEstado(nuevoEstado) {
    if (this.estado !== nuevoEstado) {
      this.estado = nuevoEstado;
      this.frame = 0;
      this.marcaFrame = millis();
    }
  }

  mover() {
    let dx = 0;
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) dx -= 1;   
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) dx += 1;  

    if (dx !== 0) {
      this.x += dx * this.velocidad;
      this.direccion = dx;
      this.cambiarEstado('caminando');
    } else {
      this.cambiarEstado('quieto');
    }

    let medio = (this.framesQuieto[0].width * this.escala) / 2;
    this.x = constrain(this.x, medio, width - medio);
  }

  animar() {
    let velocidadAnimacion = (this.estado === 'caminando') ? 80 : 450;
    if (millis() > this.marcaFrame + velocidadAnimacion) {
      this.frame++;
      this.marcaFrame = millis();
    }
  }

  imagenActual() {
    if (this.estado === 'muerto') return this.imgMuerte;
    if (this.estado === 'victoria') return this.imgVictoria;
    if (this.estado === 'caminando') return this.framesCaminar[this.frame % this.framesCaminar.length];
    return this.framesQuieto[this.frame % this.framesQuieto.length];
  }

  dibujar() {
    if (this.estaInvulnerable() && floor(millis() / 100) % 2 === 0) return;

    let img = this.imagenActual();
    let w = img.width * this.escala;
    let h = img.height * this.escala;
    let espejo = (this.estado === 'muerto' || this.estado === 'victoria') ? 1 : this.direccion;

    push();
    translate(this.x, this.piso);
    scale(espejo, 1); 
    image(img, -w / 2, -h, w, h);
    pop();
  }

  //daño y fnal

  golpear() {
    this.invulnerableHasta = millis() + 1200;
  }

  estaInvulnerable() {
    return millis() < this.invulnerableHasta;
  }

  morir() {
    this.invulnerableHasta = 0;
    this.cambiarEstado('muerto');
  }

  festejar() {
    this.invulnerableHasta = 0;
    this.cambiarEstado('victoria');
  }

  colisiona(cuchillo) {
    let mitadAncho = this.framesQuieto[0].width * this.escala * 0.35;
    let alto = this.framesQuieto[0].height * this.escala * 0.9;
    let izq = this.x - mitadAncho;
    let der = this.x + mitadAncho;
    let arriba = this.piso - alto;

    let puntos = cuchillo.puntosDeImpacto();  
    for (let i = 0; i < puntos.length; i++) {
      let p = puntos[i];
      if (p.x > izq && p.x < der && p.y > arriba && p.y < this.piso) {
        return true;
      }
    }
    return false;
  }
}
