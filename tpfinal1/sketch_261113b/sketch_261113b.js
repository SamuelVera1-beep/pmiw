// Bautista Zarzoso 125708/2 - Samuel Vera 122941/6

let carpeta = "data/";
let titulo = "EL ASESINATO DE ESTEBAN VIDAL";

// estados de pantalla
let estadoIntro = 0;
let estadoEscena = 1;
let estadoDetras = 2;
let estadoZoom = 3;
let estadoInterrogatorio = 4;
let estadoAcusar = 5;
let estadoFinal = 6;
let estadoCreditos = 7;

let estado = estadoIntro;

let imagenes = [];
let imgLaura, imgMarcos, imgSofia;
let sonidoBotones, musicaFondo, sonidoTexto;

let pistaActual = 0;
let veniaDeDetras = false;

let pistas = [
  [
  106, 154, 25, 35, "Tarjeta de acceso", 6,
  "Encontraste >Tarjeta de acceso<, pertenece a Sofía Méndez.",
  "Sofia",
  "Al interrogarla, asegura que olvidó la tarjeta hace unas semanas cuando entrevistó al señor Vidal en su despacho.",
  false
  ],
  [
  292, 269, 25, 25, "Celular", 4,
  "Encontraste >celular de Vidal<, al revisarlo registra una llamada a las 22:24 hacia Laura Vidal.",
  "Laura",
  "Al interrogarla, ella niega la llamada. Luego se contradice y declara que recibió la llamada, pero fue para un asunto familiar y no volvió a saber de él.",
  false
  ],
  [
  324, 149, 25, 20, "Restos de sangre", 14,
  "Encontraste >Restos de sangre<, al mandarlo al laboratorio, el ADN coincide con el de Marcos Ferreyra.",
  "Marcos",
  "Al interrogarlo, después de insistir, Ferreyra admite que tuvo una pequeña discusión con Vidal y terminó lastimado, pero que no recuerda mucho al haber bebido demasiado.",
  false
  ],
  [
  519, 263, 25, 20, "Uña acrílica", 3,
  "Encontraste >uña acrílica<, pertenece a Laura Vidal.",
  "Laura",
  "Al interrogarla, afirma que es su uña que perdió hace unos días. No sabe cómo llegó ahí.",
  false
  ],
  [
  577, 118, 65, 45, "Papeles", 10,
  "Encontraste >Documentos de Vidal<, encuentras documentos faltantes con huellas de Sofía y el nombre de Marcos Ferreyra en lavado de dinero y desvío de fondos.",
  "SofiaYMarcos",
  "Sofía asegura que Vidal le permitió ver unos documentos hace unos días y niega saber de documentación perdida. Marcos niega participar en negocios ilícitos, afirmando que solo iba a beber unas copas.",
  false
  ],
  [
  752, 241, 40, 30, "Grabadora", 8,
  "Encontraste >Grabadora<, al revisarla se escucha una discusión entre los hermanos Vidal.",
  "Sofia",
  "Sofía asegura que es suya y que la olvidó hace unas semanas en el despacho del Sr. Vidal cuando lo entrevistó.",
  false
  ],
  [
  295, 377, 28, 25, "Gemelo de zafiro", 12,
  "Encontraste >Gemelo de zafiro<, notas que coincide con el gemelo perdido en el saco de Marcos Ferreyra.",
  "Marcos",
  "Al interrogarlo, niega que sea suyo.",
  false
  ]
];

let tituloFinal = "";
let textosFinal = [];
let paginaFinal = 0;

let letras = 0;
let largoTexto = 0;

let yCreditos = 460;
let creditosTxt = [
  "CRÉDITOS",
  "",
  titulo,
  "Aventura gráfica interactiva",
  "",
  "Autores",
  "Bautista Zarzoso 125708/2",
  "Samuel Vera 122941/6",
  "",
  "Materia",
  "Programación para medios interactivos",
  "orientada a las tecnologías web",
  "Comisión 2",
  "",
  "Docente",
  "Matías Jauregui Lorda",
  "",
  "Gracias por jugar"
];
let creditosTam = [32, 14, 22, 16, 14, 22, 18, 18, 14, 22, 16, 16, 16, 14, 22, 16, 14, 20];

// animacion del detective en los creditos
let walking = [];
let interrogar = [];
let estadoAnim = "ENTRAR";  
let animX = -75;            
let tiempoAnim = 0;
let escDetective = 3;        
let altoSprite = 48;
let animParada = 90;

let btnComenzar = [300, 370, 200, 42, "Comenzar"];
let btnDetras = [565, 15, 215, 35, "Ir detrás del escritorio"];
let btnFrente = [565, 15, 215, 35, "Volver al frente"];
let btnVeredicto = [215, 15, 180, 35, "Emitir Veredicto"];
let btnInterrogar = [630, 385, 140, 38, "Interrogar"];
let btnVolver = [640, 385, 130, 38, "Volver"];
let btnSeguirBuscando = [20, 15, 160, 35, "Seguir buscando"];

let btnAcusarMarcos = [60, 235, 210, 45, "Acusar a Marcos"];
let btnAcusarLaura = [295, 235, 210, 45, "Acusar a Laura"];
let btnAcusarSofia = [530, 235, 210, 45, "Acusar a Sofía"];
let btnFinal4 = [215, 305, 370, 45, "Resolver el caso completo"];

let btnSiguiente = [630, 385, 140, 38, "Siguiente"];
let btnCreditos = [630, 385, 140, 38, "Créditos"];
let btnReiniciar = [300, 390, 200, 40, "Jugar de nuevo"];




function preload() {
  for (let i = 1; i <= 15; i++) {
    imagenes[i] = loadImage(carpeta + i + ".jpg");
  }

  imgLaura = loadImage(carpeta + "laura.png");
  imgMarcos = loadImage(carpeta + "marcos.png");
  imgSofia = loadImage(carpeta + "sofia.png");

  // el primer cuadro no tiene numero: walking.png, walking1.png, ...
  walking[0] = loadImage(carpeta + "walking.png");
  for (let i = 1; i <= 5; i++) {
    walking[i] = loadImage(carpeta + "walking" + i + ".png");
  }

  interrogar[0] = loadImage(carpeta + "interrogar.png");
  for (let i = 1; i <= 7; i++) {
    interrogar[i] = loadImage(carpeta + "interrogar" + i + ".png");
  }
}



function setup() {
  createCanvas(800, 450);
  textWrap(WORD);
  textFont('Consolas');

  for (let i = 1; i <= 15; i++) {
    imagenes[i].resize(800, 450);
  }

  sonidoBotones = loadSound(carpeta + "botones.wav");
  sonidoBotones.setVolume(0.5);

  musicaFondo = loadSound(carpeta + "cancion_fondo.mp3");
  musicaFondo.setVolume(0.35);

  sonidoTexto = loadSound(carpeta + "texto.wav");
  sonidoTexto.setVolume(0.4);

  reiniciarJuego();
}



function draw() {
  background(20);

  if (audioActivo()) {
    iniciarMusica();
  }

  switch (estado) {
  case estadoIntro:
    dibujarIntro();
    break;
  case estadoEscena:
    dibujarEscena();
    break;
  case estadoDetras:
    dibujarDetras();
    break;
  case estadoZoom:
    dibujarZoom();
    break;
  case estadoInterrogatorio:
    dibujarInterrogatorio();
    break;
  case estadoAcusar:
    dibujarAcusar();
    break;
  case estadoFinal:
    dibujarFinal();
    break;
  case estadoCreditos:
    dibujarCreditos();
    break;
  }

  // corta el sonido de escritura si ya termino el texto o salimos de la pantalla
  let pantallaTexto = (estado == estadoZoom || estado == estadoInterrogatorio || estado == estadoFinal);
  if ((!pantallaTexto || textoCompleto()) && sonidoTexto && sonidoTexto.isPlaying()) {
    sonidoTexto.stop();
  }
}



// pantallas

function dibujarIntro() {
  image(imagenes[1], 0, 0);

  fill(0, 200);
  noStroke();
  rect(60, 170, 680, 175, 10);

  fill(255);
  textAlign(CENTER, TOP);
  textSize(15);
  text(
    "Esteban Vidal, un poderoso empresario, está muerto en su despacho la noche de un viernes.\n" +
    "Hay tres sospechosos: Marcos Ferreyra (su socio comercial), Laura Vidal (su hermana) " +
    "y Sofía Méndez (una periodista que investigaba a Vidal).\n\n" +
    "Encuentra las pistas para resolver el caso.",
    80, 190, 640, 140
    );

  dibujarBoton(btnComenzar, true);
}



function dibujarEscena() {
  image(imagenes[2], 0, 0);

  for (let i = 0; i < 6; i++) {
    dibujarZonaPista(pistas[i]);
  }

  dibujarBarraSuperior();
  dibujarBoton(btnDetras, true);
}




function dibujarDetras() {
  image(imagenes[11], 0, 0);

  dibujarZonaPista(pistas[6]);

  dibujarBarraSuperior();
  dibujarBoton(btnFrente, true);
}



function dibujarBarraSuperior() {
  fill(0, 200);
  noStroke();
  rect(15, 15, 185, 35, 8);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  text("Pistas: " + contarTotalPistas() + " / 7", 107, 32);

  dibujarBoton(btnVeredicto, true);
}



function dibujarZonaPista(p) {
  push();
  if (mouseSobre(p)) {
    fill(255, 230, 100, 90);
    stroke(255, 230, 100);
    strokeWeight(2);
    rect(p[0], p[1], p[2], p[3], 6);
  }
  pop();
}



function dibujarZoom() {
  let p = pistas[pistaActual];
  image(imagenes[p[5]], 0, 0);

  fill(0, 215);
  noStroke();
  rect(20, 325, 760, 110, 10);

  escribirTexto(p[6], 40, 342, 570);
  dibujarBoton(btnInterrogar, true);
}



function dibujarInterrogatorio() {
  image(imagenes[2], 0, 0);
  fill(0, 140);
  noStroke();
  rect(0, 0, width, height);

  let p = pistas[pistaActual];
  let quien = p[7];
  dibujarPersonaje(quien);

  fill(0, 230);
  noStroke();
  rect(20, 305, 760, 130, 10);

  fill(130, 190, 255);
  textAlign(LEFT, TOP);
  textSize(15);
  let nombre = "";
  if (quien == "Laura") nombre = "LAURA VIDAL";
  if (quien == "Marcos") nombre = "MARCOS FERREYRA";
  if (quien == "Sofia") nombre = "SOFÍA MÉNDEZ";
  if (quien == "SofiaYMarcos") nombre = "SOFÍA MÉNDEZ Y MARCOS FERREYRA";
  text(nombre, 40, 318);

  escribirTexto(p[8], 40, 344, 580);
  dibujarBoton(btnVolver, true);
}



function dibujarPersonaje(quien) {
  push();
  blendMode(SCREEN);
  if (quien == "Laura") {
    image(imgLaura, 250, 20, 300, 300);
  } else if (quien == "Marcos") {
    image(imgMarcos, 250, 20, 300, 300);
  } else if (quien == "Sofia") {
    image(imgSofia, 250, 20, 300, 300);
  } else if (quien == "SofiaYMarcos") {
    image(imgSofia, 140, 20, 280, 280);
    image(imgMarcos, 400, 20, 280, 280);
  }
  pop();
}



function dibujarAcusar() {
  image(imagenes[15], 0, 0);
  fill(0, 215);
  noStroke();
  rect(35, 65, 730, 310, 12);

  dibujarBoton(btnSeguirBuscando, true);

  fill(255, 220, 110);
  textAlign(CENTER, TOP);
  textSize(20);
  text("PANEL DE ACUSACIÓN", 400, 85);

  fill(230);
  textSize(14);
  text("Reuní las 3 pistas de un sospechoso para acusarlo,\no las 7 pistas totales para descubrir toda la verdad.", 400, 122);

  let cantMarcos = contarPistasMarcos();
  let cantLaura = contarPistasLaura();
  let cantSofia = contarPistasSofia();
  let cantTotal = contarTotalPistas();

  fill(255);
  textSize(14);
  text("Marcos: " + cantMarcos + " / 3", 165, 205);
  text("Laura: " + cantLaura + " / 3", 400, 205);
  text("Sofía: " + cantSofia + " / 3", 635, 205);

  dibujarBoton(btnAcusarMarcos, cantMarcos >= 3);
  dibujarBoton(btnAcusarLaura, cantLaura >= 3);
  dibujarBoton(btnAcusarSofia, cantSofia >= 3);
  dibujarBoton(btnFinal4, cantTotal >= 7);
}



function dibujarFinal() {
  image(imagenes[15], 0, 0);

  fill(0, 225);
  noStroke();
  rect(25, 30, 750, 395, 12);

  fill(255, 220, 110);
  textAlign(LEFT, TOP);
  textSize(18);
  text(tituloFinal, 45, 50);

  escribirTexto(textosFinal[paginaFinal], 45, 88, 710);

  if (paginaFinal < textosFinal.length - 1) {
    dibujarBoton(btnSiguiente, true);
  } else {
    dibujarBoton(btnCreditos, true);
  }
}



function dibujarCreditos() {
  background(15);

  push();
  noStroke();
  textAlign(CENTER, CENTER);
  for (let i = 0; i < creditosTxt.length; i++) {
    let y = floor(yCreditos) + i * 36;
    // cambio
    let alfa = constrain(min(y, btnReiniciar[1] - 15 - y) / 55, 0, 1) * 255;
    fill(255, alfa);
    textSize(creditosTam[i]);
    text(creditosTxt[i], width / 2, y);
  }
  pop();

  yCreditos -= 0.6;
  if (yCreditos < -creditosTxt.length * 36) {
    yCreditos = height;
  }

  dibujarAnimacion();

  dibujarBoton(btnReiniciar, true);
}

function dibujarAnimacion() {
  let animY = height / 2 - (altoSprite * escDetective) / 2;

  push();
  noSmooth();

  switch (estadoAnim) {
  case "ENTRAR":
    // aparece caminando por la izquierda
    reproducirAnimacion(walking, animX, animY, 7, escDetective);
    animX += 1.5;

    if (animX >= animParada) {
      animX = animParada;
      cambiarAnimacion("INTERROGAR");
    }
    break;

   case "INTERROGAR":
    // se detiene antes de tapar los creditos
    reproducirAnimacion(interrogar, animX, animY, 10, escDetective);
    tiempoAnim++;

   if (tiempoAnim > 160) {
      cambiarAnimacion("SALIR");
    }
    break;

  case "SALIR":
    // se va por el mismo lado: se espeja para que mire a la izquierda
    scale(-1, 1);
     reproducirAnimacion(walking, -animX - 75, animY, 7, escDetective);
    animX -= 1.5;

    if (animX < -75) {
      animX = -75;
      cambiarAnimacion("ENTRAR");
    }
    break;
  }
  pop();
}

function reproducirAnimacion(arreglo, x, y, velocidad, miEsc) {
  let frameActual = calcularFrame(arreglo.length, velocidad);
  let img = arreglo[frameActual];

  image(img, x, y, img.width * miEsc, img.height * miEsc);
}



function calcularFrame(cantidadFrames, velocidad) {
  let frame = floor(frameCount / velocidad) % cantidadFrames;

  return frame;
}



function cambiarAnimacion(nuevoEstado) {
  estadoAnim = nuevoEstado;
  tiempoAnim = 0;
}

// interfaz, texto y conteo

function dibujarBoton(b, habilitado) {
  push();
  strokeWeight(1.5);
  if (!habilitado) {
    fill(55, 55, 55, 200);
    stroke(100);
  } else if (mouseSobre(b)) {
    fill(120, 120, 120, 235);
    stroke(220);
  } else {
    fill(70, 70, 70, 225);
    stroke(180);
  }
  rect(b[0], b[1], b[2], b[3], 8);

  noStroke();
  if (habilitado) {
    fill(255);
  } else {
    fill(130);
  }
  textSize(14);
  textAlign(CENTER, CENTER);
  text(b[4], b[0] + b[2] / 2, b[1] + b[3] / 2);
  pop();
}



function mouseSobre(zona) {
  return mouseX > zona[0] && mouseX < zona[0] + zona[2] &&
    mouseY > zona[1] && mouseY < zona[1] + zona[3];
}



function escribirTexto(txt, x, y, ancho) {
  largoTexto = txt.length;
  letras = min(letras + 1.5, largoTexto);

  if (letras < largoTexto && audioActivo()) {
    iniciarSonidoTexto();
  }

  push();
  noStroke();
  fill(255);
  textAlign(LEFT, TOP);
  textSize(15);
  text(txt.substring(0, floor(letras)), x, y, ancho);
  pop();
}



function nuevoTexto() {
  letras = 0;
  largoTexto = 1;
}



function completarTexto() {
  letras = largoTexto;
  if (sonidoTexto && sonidoTexto.isPlaying()) {
    sonidoTexto.stop();
  }
}



function textoCompleto() {
  return letras >= largoTexto;
}



function contarTotalPistas() {
  let total = 0;
  for (let i = 0; i < pistas.length; i++) {
    if (pistas[i][9]) total++;
  }
  return total;
}



function contarPistasMarcos() {
  let c = 0;
  if (pistas[2][9]) c++;
  if (pistas[4][9]) c++;
  if (pistas[6][9]) c++;
  return c;
}



function contarPistasLaura() {
  let c = 0;
  if (pistas[1][9]) c++;
  if (pistas[3][9]) c++;
  if (pistas[5][9]) c++;
  return c;
}



function contarPistasSofia() {
  let c = 0;
  if (pistas[0][9]) c++;
  if (pistas[4][9]) c++;
  if (pistas[5][9]) c++;
  return c;
}


// eventos y flujo



function mousePressed() {
  userStartAudio();

  if (estado == estadoIntro) {
    if (mouseSobre(btnComenzar)) {
      sonarEfecto(sonidoBotones);
      cambiarEstado(estadoEscena);
    }
  } else if (estado == estadoEscena) {
    if (mouseSobre(btnVeredicto)) {
      sonarEfecto(sonidoBotones);
      cambiarEstado(estadoAcusar);
      return;
    }
    if (mouseSobre(btnDetras)) {
      sonarEfecto(sonidoBotones);
      cambiarEstado(estadoDetras);
      return;
    }
    for (let i = 0; i < 6; i++) {
      if (mouseSobre(pistas[i])) {
        sonarEfecto(sonidoBotones);
        pistas[i][9] = true;
        pistaActual = i;
        veniaDeDetras = false;
        cambiarEstado(estadoZoom);
        break;
      }
    }
  } else if (estado == estadoDetras) {
    if (mouseSobre(btnVeredicto)) {
      sonarEfecto(sonidoBotones);
      cambiarEstado(estadoAcusar);
      return;
    }
    if (mouseSobre(btnFrente)) {
      sonarEfecto(sonidoBotones);
      cambiarEstado(estadoEscena);
      return;
    }
    if (mouseSobre(pistas[6])) {
      sonarEfecto(sonidoBotones);
      pistas[6][9] = true;
      pistaActual = 6;
      veniaDeDetras = true;
      cambiarEstado(estadoZoom);
    }
  } else if (estado == estadoZoom) {
    if (mouseSobre(btnInterrogar)) {
      if (!textoCompleto()) {
        completarTexto();
        return;
      }
      sonarEfecto(sonidoBotones);
      cambiarEstado(estadoInterrogatorio);
    }
  } else if (estado == estadoInterrogatorio) {
    if (mouseSobre(btnVolver)) {
      if (!textoCompleto()) {
        completarTexto();
        return;
      }
      sonarEfecto(sonidoBotones);
      if (veniaDeDetras) {
        cambiarEstado(estadoDetras);
      } else {
        cambiarEstado(estadoEscena);
      }
    }
  } else if (estado == estadoAcusar) {
    if (mouseSobre(btnSeguirBuscando)) {
      sonarEfecto(sonidoBotones);
      cambiarEstado(estadoEscena);
      return;
    }
    if (contarPistasMarcos() >= 3 && mouseSobre(btnAcusarMarcos)) {
      sonarEfecto(sonidoBotones);
      iniciarFinal(1);
    } else if (contarPistasLaura() >= 3 && mouseSobre(btnAcusarLaura)) {
      sonarEfecto(sonidoBotones);
      iniciarFinal(2);
    } else if (contarPistasSofia() >= 3 && mouseSobre(btnAcusarSofia)) {
      sonarEfecto(sonidoBotones);
      iniciarFinal(3);
    } else if (contarTotalPistas() >= 7 && mouseSobre(btnFinal4)) {
      sonarEfecto(sonidoBotones);
      iniciarFinal(4);
    }
  } else if (estado == estadoFinal) {
    if (paginaFinal < textosFinal.length - 1) {
      if (mouseSobre(btnSiguiente)) {
        if (!textoCompleto()) {
          completarTexto();
          return;
        }
        sonarEfecto(sonidoBotones);
        paginaFinal++;
        nuevoTexto();
      }
    } else {
      if (mouseSobre(btnCreditos)) {
        if (!textoCompleto()) {
          completarTexto();
          return;
        }
        sonarEfecto(sonidoBotones);
        cambiarEstado(estadoCreditos);
      }
    }
  } else if (estado == estadoCreditos) {
    if (mouseSobre(btnReiniciar)) {
      sonarEfecto(sonidoBotones);
      reiniciarJuego();
    }
  }
}



function iniciarFinal(num) {
  paginaFinal = 0;

  if (num == 1) {
    tituloFinal = 'FINAL 1: "El culpable evidente"';
    textosFinal = [
      "El detective acusa a Marcos. Ante la abrumadora evidencia física y su claro motivo (evitar que Vidal lo entregara a la justicia por los negocios ilícitos), Marcos es arrestado por asesinato. El caso se cierra rápidamente para la prensa.\n\nMarcos es arrestado por agresión, fraude y lavado de dinero, ya que los documentos revelan su participación en los crímenes de la empresa."
    ];
  } else if (num == 2) {
    tituloFinal = 'FINAL 2: "La heredera acorralada"';
    textosFinal = [
      "Al ser confrontada, la actitud defensiva de Laura Vidal se quiebra, admitiendo que estuvo en el despacho después de una llamada de auxilio por parte de Esteban. Como ella huyó convencida de que lo había matado al empujarlo, su confesión es genuina y desgarradora. Admite el forcejeo y el odio que sentía por los chantajes de su hermano.\n\nEs arrestada por homicidio y se cierra el caso. Laura enfrenta cargos por agresión física y omisión de auxilio, por haber abandonado a su hermano creyéndolo al borde de la muerte."
    ];
  } else if (num == 3) {
    tituloFinal = 'FINAL 3: "La exclusiva fatal"';
    textosFinal = [
      "El detective confronta a Sofía. Acorralada por la precisión de la línea temporal y la prueba de los documentos movidos tras la caída fatal, ella confiesa. Admite que estaba allí para conseguir la exclusiva que consagraría su carrera y que, cuando Vidal la descubrió, el pánico la llevó a empujarlo provocándole una caída grave y abandonando su cuerpo para huir de la escena.\n\nSofía es arrestada por homicidio culposo, allanamiento y robo de evidencia."
    ];
  } else if (num == 4) {
    tituloFinal = 'FINAL 4: "La red de egoísmo" (Final Verdadero)';
    textosFinal = [
      "El detective comprende que la escena del crimen no es el resultado de un plan maestro, sino una cadena de colisiones desastrosas.\n\nMarcos Ferreyra fue culpable de la primera herida: llegó a las 22:05 y, al ser amenazado por Vidal con entregar pruebas de lavado de dinero, perdió el control a las 22:17 y lo golpeó en el rostro, perdiendo su gemelo de zafiro y dejando sangre al lastimarse.",
      "Laura Vidal fue la segunda en llegar. Aturdido y sangrando, Vidal la llamó a las 22:24 pidiendo auxilio. Ella llegó a las 22:30, pero Vidal intentó chantajearla con el testamento familiar. Superada por el resentimiento, Laura lo empujó con fuerza haciéndolo caer inconsciente, y huyó a las 22:34 creyendo haberlo matado.",
      "Sofía Méndez fue la última. Llevaba horas escondida grabando todo y salió a las 22:35 a robar los documentos que probaban que Vidal era el verdadero cerebro criminal. Pero Vidal recobró el conocimiento y se abalanzó sobre ella; al empujarlo para liberarse, Vidal golpeó su cabeza fatalmente contra el mármol del escritorio.\n\nResultado: Marcos es arrestado por agresión, fraude y lavado de dinero; Laura por agresión y omisión de auxilio; y Sofía por homicidio culposo, allanamiento y robo de evidencia."
    ];
  }

  cambiarEstado(estadoFinal);
}



function cambiarEstado(nuevo) {
  estado = nuevo;
  nuevoTexto();

  if (nuevo == estadoCreditos) {
    yCreditos = height;
    reiniciarAnimacion();
  }
}



function reiniciarJuego() {
  estado = estadoIntro;
  pistaActual = 0;
  paginaFinal = 0;
  veniaDeDetras = false;
  for (let i = 0; i < pistas.length; i++) {
    pistas[i][9] = false;
  }
  nuevoTexto();
}



// sonido

function sonarEfecto(sonido) {
  if (sonido && sonido.isLoaded()) {
    sonido.stop();
    sonido.play();
  }
}



function audioActivo() {
  return getAudioContext().state == "running";
}



function iniciarMusica() {
  if (musicaFondo && musicaFondo.isLoaded() && !musicaFondo.isPlaying()) {
    musicaFondo.loop();
  }
}



function iniciarSonidoTexto() {
  if (sonidoTexto && sonidoTexto.isLoaded() && !sonidoTexto.isPlaying()) {
    sonidoTexto.loop();
  }
}
