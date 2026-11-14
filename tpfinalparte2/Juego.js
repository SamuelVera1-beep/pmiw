// Clase principal

class Juego {

  constructor() {
    // estados
    this.estado = 'inicio';

    this.personaje = new Personaje(imgQuieto, imgCaminar, imgMuerte, imgVictoria);
    this.temporizador = new Temporizador(60); 

    // corazones
    this.corazones = [];
    for (let i = 0; i < 3; i++) {
      this.corazones.push(new Corazon(imgCorazon, imgCorazonPerdido, 16 + i * 38, 14));
    }

    //cuchillos
    this.cuchillos = [];
    this.tiempoParaCuchillo = 0;

    // botones
    this.btnJugar         = new Boton('Jugar',         400, 190, 150, 42, 'jugar');
    this.btnInstrucciones = new Boton('Instrucciones', 225, 190, 170, 42, 'instrucciones');
    this.btnCreditos      = new Boton('Créditos',      575, 190, 150, 42, 'creditos');
    this.btnVolver        = new Boton('Volver',        320, 243, 140, 34, 'menu');
    this.btnEmpezar       = new Boton('Jugar',         480, 243, 140, 34, 'jugar');
    this.btnReiniciar     = new Boton('Reiniciar (R)', 320, 243, 160, 34, 'jugar');
    this.btnMenu          = new Boton('Menú',          480, 243, 140, 34, 'menu');
  }

  // PARTIDA

  reiniciar() {
    this.personaje.reiniciar();
    this.temporizador.reiniciar();
    this.cuchillos = [];
    this.tiempoParaCuchillo = 800;
    for (let i = 0; i < this.corazones.length; i++) {
      this.corazones[i].llenar();
    }
  }

  iniciarPartida() {
    this.reiniciar();
    this.estado = 'jugando';
    userStartAudio(); 
    sonidoGanar.stop();
    sonidoPerder.stop();
    musica.stop();
    musica.loop();
  }

  volverAlMenu() {
    this.reiniciar();
    this.estado = 'inicio';
    musica.stop();
    sonidoGanar.stop();
    sonidoPerder.stop();
  }

  ganar() {
    this.estado = 'ganaste';
    this.cuchillos = [];
    this.personaje.festejar();
    musica.stop();
    sonidoGanar.play();
  }

  perder() {
    this.estado = 'perdiste';
    this.personaje.morir();
    musica.stop();
    sonidoPerder.play();
  }

  vidasRestantes() {
    let cantidad = 0;
    for (let i = 0; i < this.corazones.length; i++) {
      if (this.corazones[i].estaLleno) cantidad++;
    }
    return cantidad;
  }

  recibirDanio() {
    this.personaje.golpear();
    sonidoDanio.play();

    for (let i = this.corazones.length - 1; i >= 0; i--) {
      if (this.corazones[i].estaLleno) {
        this.corazones[i].vaciar();
        break;
      }
    }

    if (this.vidasRestantes() === 0) {
      this.perder();
    }
  }

  generarCuchillos(dt) {
    let progreso = this.temporizador.progreso(); 
    this.tiempoParaCuchillo -= dt;

    if (this.tiempoParaCuchillo <= 0) {
      let velocidad = lerp(3, 7, progreso);
      this.cuchillos.push(new Cuchillo(imgCuchillo, this.personaje.x, this.personaje.piso, velocidad));
      this.tiempoParaCuchillo = lerp(900, 300, progreso);
    }
  }

  actualizar() {
    if (this.estado === 'jugando') {
      let dt = min(deltaTime, 100);

      this.temporizador.actualizar(dt);
      this.personaje.mover();
      this.generarCuchillos(dt);

      for (let i = this.cuchillos.length - 1; i >= 0; i--) {
        let c = this.cuchillos[i];
        c.mover();

        if (!this.personaje.estaInvulnerable() && this.personaje.colisiona(c)) {
          this.cuchillos.splice(i, 1);
          this.recibirDanio();
          if (this.estado !== 'jugando') break;
        } else if (c.fueraDePantalla()) {
          this.cuchillos.splice(i, 1);
        }
      }

      if (this.estado === 'jugando' && this.temporizador.termino()) {
        this.ganar();
      }
    }

    this.personaje.animar();
  }

  dibujar() {
    image(fondo, 0, 0, width, height, 0, 25, 800, 400);

    if (this.estado === 'inicio') {
      this.personaje.dibujar();
      this.dibujarTitulo();

    } else if (this.estado === 'instrucciones') {
      this.personaje.dibujar();
      this.dibujarPanel('INSTRUCCIONES', [
        'Movete con las flechas ← → o A y D.',
        'Esquivá los cuchillos durante 1 minuto.',
        'Tenés 3 corazones y cada cuchillo te quita uno.',
        'Si el reloj llega a 0:00, ganás.',
        'Si te quedás sin corazones, perdés.',
        'Presioná R para reiniciar la partida.'
      ]);

    } else if (this.estado === 'creditos') {
      this.personaje.dibujar();
      this.dibujarPanel('CRÉDITOS', [
        'Bautista Zarzoso, Samuel Vera',
        'Programación de Medios Interactivos',
        'Facultad de Artes - UNLP - 2026',
      ]);

    } else if (this.estado === 'jugando') {
      this.dibujarCuchillos();
      this.personaje.dibujar();
      this.dibujarHUD();

    } else if (this.estado === 'ganaste') {
      this.personaje.dibujar();
      this.dibujarHUD();
      this.dibujarPanel('¡GANASTE!', [
        'Sobreviviste los 1:00 minutos.',
        'Corazones restantes: ' + this.vidasRestantes() + ' de ' + this.corazones.length
      ]);

    } else if (this.estado === 'perdiste') {
      this.dibujarCuchillos();
      this.personaje.dibujar();
      this.dibujarHUD();
      this.dibujarPanel('PERDISTE', [
        'Te quedaste sin corazones.',
        'Aguantaste ' + this.temporizador.formatear(this.temporizador.transcurrido, false) + ' de 1:00.'
      ]);
    }

    this.dibujarBotones();
  }

  dibujarCuchillos() {
    for (let i = 0; i < this.cuchillos.length; i++) {
      this.cuchillos[i].dibujar();
    }
  }

  dibujarHUD() {
    for (let i = 0; i < this.corazones.length; i++) {
      this.corazones[i].dibujar();
    }
    this.temporizador.dibujar();
  }

  dibujarTitulo() {
    push();
    textAlign(CENTER, CENTER);
    stroke(0);
    strokeWeight(6);
    fill(220, 30, 30);
    textStyle(BOLD);
    textSize(52);
    text('LLUVIA DE CUCHILLOS', width / 2, 75);
    fill(255);
    strokeWeight(4);
    textSize(20);
    textStyle(NORMAL);
    text('Ayuda a Esteban Vidal a sobrevivir a sus intentos de asesinatos', width / 2, 125);
    pop();
  }

  dibujarPanel(titulo, lineas) {
    push();
    rectMode(CORNER);
    stroke(255);
    strokeWeight(2);
    fill(0, 200);
    rect(140, 20, 520, 250, 12);

    noStroke();
    textAlign(CENTER, CENTER);
    fill(255, 210, 60);
    textStyle(BOLD);
    textSize(30);
    text(titulo, width / 2, 52);

    fill(255);
    textStyle(NORMAL);
    textSize(16);
    for (let i = 0; i < lineas.length; i++) {
      text(lineas[i], width / 2, 92 + i * 24);
    }
    pop();
  }

  botonesVisibles() {
    if (this.estado === 'inicio') return [this.btnJugar, this.btnInstrucciones, this.btnCreditos];
    if (this.estado === 'instrucciones') return [this.btnVolver, this.btnEmpezar];
    if (this.estado === 'creditos') return [this.btnVolver, this.btnEmpezar];
    if (this.estado === 'ganaste' || this.estado === 'perdiste') return [this.btnReiniciar, this.btnMenu];
    return [];
  }

  dibujarBotones() {
    let botones = this.botonesVisibles();
    let encima = false;
    for (let i = 0; i < botones.length; i++) {
      botones[i].dibujar();
      if (botones[i].estaEncima()) encima = true;
    }
    cursor(encima ? HAND : ARROW);
  }

  mousePressed() {
    let botones = this.botonesVisibles();
    for (let i = 0; i < botones.length; i++) {
      if (botones[i].estaEncima()) {
        this.ejecutarAccion(botones[i].accion);
        return;
      }
    }
  }

  ejecutarAccion(accion) {
    if (accion === 'jugar') this.iniciarPartida();
    else if (accion === 'menu') this.volverAlMenu();
    else if (accion === 'instrucciones') this.estado = 'instrucciones';
    else if (accion === 'creditos') this.estado = 'creditos';
  }

  keyPressed() {
    if ((key === 'r' || key === 'R') &&
        (this.estado === 'jugando' || this.estado === 'ganaste' || this.estado === 'perdiste')) {
      this.iniciarPartida();
    }
  }
}
