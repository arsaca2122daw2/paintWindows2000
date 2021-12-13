//VARIABLES GLOBALES
let x = 0,
  y = 0,
  dibujando = false,
  lineaDisc = false,
  color = "black",
  color2 = "white"
  grosor = 1,
  relleno = false,
  italic = false,
  bold = false,
  fuente = false,
  estiloFuente1 = "",
  estiloFuente2 = "",
  estiloFuente3 = " Roboto";
let arrayDeLineas = [];
let index = -1;
let colorFondoPred = "white";

//VARIABLES GLOBALES PARA CANVAS
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d"); //retorna el contexto de dibujo en el canvas
ctx.fillStyle = colorFondoPred;
ctx.fillRect(0, 0, canvas.width, canvas.height);

function lineaDiscontinua() {
  if(!lineaDisc){
    lineaDisc= true;
    ctx.setLineDash([4,10]);
  }else{
    lineaDisc=false;
    ctx.setLineDash([]);
  }
}

//ELEGIR COLOR
function elegirColor(c) {
  color = c;
  document.getElementById("color").style.backgroundColor = c;
}

function elegirColor2(c) {
  color2 = c;
  document.getElementById("color2").style.backgroundColor = c;
}

//ELEGIR GROSOR
function elegirGrosor(g) {
  grosor = g;
}

//LIMPIACANVAS
document.getElementById("borrarLienzo").onclick = (function () {
  ctx.fillStyle = colorFondoPred;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

//UNDO
document.getElementById("ctrlZ").onclick = (function () {
  if (index <= 0) {
    ctx.fillStyle = colorFondoPred;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    index = -1;
  } else {
    index -= 1;
    arrayDeLineas.pop();
    ctx.putImageData(arrayDeLineas[index], 0, 0);
  }
});

//PONER QUITAR RELLENO
document.getElementById("relleno").onclick = (function () {
  if (relleno) relleno = false;
  else relleno = true;
});

//----------------------------------------------------------------------FUNCIONES OP-----------------------------------------------------------------------

//FUNCION PARA PINTAR
function lapiz(l) {
  //dependiendo si es lapiz, goma o pincel, les asigna valores predeterminados
  function tipoHerramienta(l) {
    if (l == 1) {
      //lapiz
      grosor = 1;
      color = document.getElementById("color").style.backgroundColor;
    }
    if (l == 2) {
      //goma
      grosor = 2;
      color = "white";
    }
    if (l == 3) {
      //pincel
      grosor = 2;
      color = document.getElementById("color").style.backgroundColor;
    }
  }

  tipoHerramienta(l);

  //DIBUJAR
  canvas.addEventListener("mousedown", empezarDibujar);
  canvas.addEventListener("mousemove", dibujar);
  canvas.addEventListener("mouseout", pararDibujar);
  canvas.addEventListener("mouseup", pararDibujar);

  function empezarDibujar(e) {
    console.log("dibujar");
    dibujando = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    e.preventDefault();
  }

  function dibujar(e) {
    if (dibujando) {
      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.strokeStyle = color;
      ctx.lineWidth = grosor;

      ctx.stroke();
    }
  }

  function pararDibujar(e) {
    if (dibujando) {
      ctx.stroke();
      ctx.closePath();
    }
    e.preventDefault();
    if (e.type != "mouseout") {
      arrayDeLineas.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      index += 1;
    }
    dibujando = false;

  }
}

//FIGURAS GEOMETRICAS

//DECIDIR SI HAY RELLENO O NO
document.getElementById("relleno").onclick = (function () {
  console.log("relleno");
  if (relleno === false) {
    relleno = true;
  } else {
    relleno = false;
  }
  console.log(relleno);
});

//FUNCION PARA CREAR UN RECTANGULO DE TAMAÑO PREDETERMINADO
document.getElementById("rectangulo").onclick = (function () {
  console.log("rectangulo");
  ctx.strokeStyle = color;
  ctx.fillStyle = color2;
  ctx.lineWidth = grosor;
  if (!relleno) {//CREAR RECTANGULO SIN RELLENO
    canvas.addEventListener("click", function (e) {
      ctx.beginPath();
      ctx.rect(
        e.clientX - ctx.canvas.offsetLeft,
        e.clientY - ctx.canvas.offsetTop,
        150,
        100
      );//CREAR RECTANGULO CON RELLENO
      ctx.stroke();
      ctx.closePath();
      arrayDeLineas.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      index += 1;
      this.removeEventListener("click", arguments.callee, false);
    });
  } else {
    canvas.addEventListener("click", function (e) {
      ctx.beginPath();
      ctx.fillRect(e.clientX - ctx.canvas.offsetLeft, e.clientY - ctx.canvas.offsetTop, 150, 100);
      ctx.strokeRect(e.clientX - ctx.canvas.offsetLeft, e.clientY - ctx.canvas.offsetTop, 150, 100)
      ctx.closePath();
      arrayDeLineas.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      index += 1;
      this.removeEventListener("click", arguments.callee, false);
    });
  }
});

//FUNCION PARA CREAR UNA LINEA CLICK ON CLICK
document.getElementById("linea").onclick = (function () {
  console.log("linea");
  ctx.strokeStyle = color;
  ctx.lineWidth = grosor;
  canvas.addEventListener("mousedown", function (e) {
    ctx.beginPath();
    ctx.moveTo(
      e.clientX - ctx.canvas.offsetLeft,
      e.clientY - ctx.canvas.offsetTop
    );
  });

  canvas.addEventListener("mouseup", function (e) {
    ctx.lineTo(
      e.clientX - ctx.canvas.offsetLeft,
      e.clientY - ctx.canvas.offsetTop
    );
    ctx.stroke();
    arrayDeLineas.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
    this.removeEventListener("mouseup", arguments.callee, false);
  });
});

//FUNCION PARA CREAR UN CIRCULO DE TAMAÑO PREDETERMINADO
document.getElementById("circulo").onclick = (function () {
  console.log("circulo");
  ctx.strokeStyle = color;
  ctx.fillStyle = color2;
  ctx.lineWidth = grosor;
  if (!relleno) {//CREAR UN CRICULO SIN RELLENO
    canvas.addEventListener("click", function (e) {
      ctx.beginPath();
      ctx.arc(e.clientX - ctx.canvas.offsetLeft, e.clientY - ctx.canvas.offsetTop, 75, 0, 2 * Math.PI);
      ctx.stroke();
      arrayDeLineas.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      index += 1;
      this.removeEventListener("click", arguments.callee, false);
    });
  } else {//CREAR UN CIRCULO CON RELLENO
    canvas.addEventListener("click", function (e) {
      ctx.beginPath();
      ctx.arc(e.clientX - ctx.canvas.offsetLeft, e.clientY - ctx.canvas.offsetTop, 75, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      arrayDeLineas.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      index += 1;
      this.removeEventListener("click", arguments.callee, false);
    });
  }
});
//FUNCION PARA CREAR UN TRIANGULO DE TAMAÑO PREDETERMINADO
document.getElementById("triangulo").onclick = (function () {
  console.log("triangulo");
  ctx.strokeStyle = color;
  ctx.fillStyle = color2;
  ctx.lineWidth = grosor;
  if (!relleno) {//CREAR TRIANGULO SIN RELLENO
    canvas.addEventListener("click", function (e) {
      ctx.beginPath();
      ctx.moveTo(
        e.clientX - ctx.canvas.offsetLeft,
        e.clientY - ctx.canvas.offsetTop
      );
      ctx.lineTo(
        e.clientX - ctx.canvas.offsetLeft + 100,
        e.clientY - ctx.canvas.offsetTop + 150
      );
      ctx.lineTo(
        e.clientX - ctx.canvas.offsetLeft - 100,
        e.clientY - ctx.canvas.offsetTop + 150
      );
      ctx.lineTo(
        e.clientX - ctx.canvas.offsetLeft,
        e.clientY - ctx.canvas.offsetTop
      );
      ctx.stroke();

      arrayDeLineas.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      index += 1;
      this.removeEventListener("click", arguments.callee, false);
    });

  } else {//CREAR TRAINGULO CON RELLENO
    canvas.addEventListener("click", function (e) {
      ctx.beginPath();
      ctx.moveTo(
        e.clientX - ctx.canvas.offsetLeft,
        e.clientY - ctx.canvas.offsetTop
      );
      ctx.lineTo(
        e.clientX - ctx.canvas.offsetLeft + 100,
        e.clientY - ctx.canvas.offsetTop + 150
      );
      ctx.lineTo(
        e.clientX - ctx.canvas.offsetLeft - 100,
        e.clientY - ctx.canvas.offsetTop + 150
      );
      ctx.lineTo(
        e.clientX - ctx.canvas.offsetLeft,
        e.clientY - ctx.canvas.offsetTop
      );
      ctx.fill();
      ctx.stroke();
      arrayDeLineas.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      index += 1;
      this.removeEventListener("click", arguments.callee, false);
    });

  }
});

//FUNCION PARA COLOCAR UNA IMAGEN RANDOM DE 4 EN EL CANVAS

document.getElementById("imagenMas").onclick = (function () {
  console.log("imagen+");
  ctx.fillStyle = colorFondoPred;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let numRandom = Math.ceil(Math.random() * (4 - 0) + 0);
  console.log(numRandom);
  let img = new Image();

  if (numRandom == 1) img.src = "/imagenesDeFondo/img1.jpg";
  if (numRandom == 2) img.src = "/imagenesDeFondo/img2.jpg";
  if (numRandom == 3) img.src = "/imagenesDeFondo/img3.jpg";
  if (numRandom == 4) img.src = "/imagenesDeFondo/img4.jpg";

  ctx.drawImage(img, 0, 0);
  arrayDeLineas.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  index += 1;

  //para que cargue la foto primero
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
  };
});

//PASAR A NEGATIVO EL DIBUJO

document.getElementById("negativo").onclick = (function () {
  console.log("pasarNegativo");
  let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  let pixels = imgData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = 255 - pixels[i]; //rojo R
    pixels[i + 1] = 255 - pixels[i + 1]; //verde G
    pixels[i + 2] = 255 - pixels[i + 2]; //azul B
  }

  ctx.putImageData(imgData, 0, 0);
  arrayDeLineas.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  index += 1;
});

//PASAR A BLANCO Y NEGRO EL DIBUJO

document.getElementById("ByN").onclick = (function () {
  console.log("pasarByN");
  let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  let pixels = imgData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    iluminacion = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
    pixels[i] = iluminacion; //rojo R
    pixels[i + 1] = iluminacion; //verde G
    pixels[i + 2] = iluminacion; //azul B
  }

  ctx.putImageData(imgData, 0, 0);
  arrayDeLineas.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  index += 1;
});

//GUARDAR IMAGEN
document.getElementById("guardarImg").onclick = (function () {
  img = canvas.toDataURL("image/png", 1.0);
  let url = document.createElement('a');
  url.download = 'CANVAS.png';
  url.href = img;
  url.click();
});

//PONER TEXTO EN EL CANVAS
//PONER CURSIVA
document.getElementById("italic").onclick = (function () {
  console.log("italic");
  if (italic === false) {
    italic = true;
    estiloFuente1 = "italic ";
  } else {
    italic = false; estiloFuente1 = "";
  }
  console.log(italic);
  console.log(estiloFuente1);
});
//PONER EN NEGRITA
document.getElementById("negrita").onclick = (function () {
  console.log("negrita");
  if (negrita === false) {
    negrita = true;
    estiloFuente2 = "bold ";
  } else {
    negrita = false; estiloFuente2 = "";
  }
  console.log(negrita);
  console.log(estiloFuente2);
});
//CAMBIAR DE FUENTE
document.getElementById("fuente").onclick = (function () {
  console.log("fuente");
  if (fuente == false) {
    fuente = true;
    estiloFuente3 = " Roboto";
  } else {
    fuente = false; estiloFuente3 = " Comic Neue";
  }
  console.log(fuente);
  console.log(estiloFuente3);
});
//AÑADIR TEXTO
document.getElementById("texto").onclick = (function () {
  console.log("ponerTexto");

  ctx.font = estiloFuente1 + estiloFuente2 + grosor + "px" + estiloFuente3;
  ctx.fillStyle = color;
  console.log(ctx.font);
  canvas.addEventListener("click", function (e) {

    ctx.fillText(prompt(), e.clientX - ctx.canvas.offsetLeft, e.clientY - ctx.canvas.offsetLeft);
    arrayDeLineas.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
    this.removeEventListener("click", arguments.callee, false);
    console.log(ctx.font);
  });
});