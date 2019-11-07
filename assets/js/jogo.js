function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

var aleatorio,
  elRand,
  palavra,
  trr,
  str,
  quantErros = 0,
  acertos = 0,
  erros = [];

const CAMINHO = "/assets/images/";
const imagem = document.getElementById("imagem");
const elErro = document.getElementById("erros");
const texto = document.getElementById("get-linhas");
const elEntradaLetra = document.getElementById("letra");
const btnIniciarNovamente = document.getElementById("btn-iniciar-novamente");

var palavras = [
  "casa",
  "deus",
  "computador",
  "mouse",
  "grampeador",
  "paralelepipedo",
];

function iniciarJogo() {
  aleatorio = getRandomIntInclusive(0, palavras.length - 1);

  palavra = palavras[aleatorio];

  elRand = palavra;

  var linha = "";

  elRand = elRand.split("").map(el => {
    linha += "<span></span>";
    return el;
  });

  texto.innerHTML = linha;

  trr = texto.innerText.split(" ");
  str = texto.innerHTML.match(/\<span>\<\/span\>/g);
}

function button() {
  btnIniciarNovamente.removeAttribute("hidden");
  btnIniciarNovamente.style.display = "block";
}

function restartJogo() {
  elEntradaLetra.value = "";
  elEntradaLetra.disabled = false;
  elEntradaLetra.select();
  elEntradaLetra.focus();
  elErro.innerHTML = "";
  elErro.innerText = "";
}

elEntradaLetra.onkeyup = ev => {
  var letra;

  if (ev.keyCode == 13) {
    letra = ev.target.value;

    var index = elRand.findIndex(lett => lett === letra);

    if (
      erros.findIndex(lett => lett === letra) !== -1 ||
      trr.findIndex(lett => lett === letra) !== -1
    ) {
      ev.target.select();
      alert("Esta letra já foi escolhida.");
    } else {
      if (index > -1) {
        palavra.split("").map((el, index) => {
          if (el == letra) {
            trr[index] = el;
            str[index] = `<span>${el}</span>`;
            ++acertos;
          }
        });
      } else {
        erros.push(letra);
        ++quantErros;
        imagem.src = CAMINHO + `hangman-${quantErros}.png`;
      }

      //Caso tenha alcançando o número máximo de tentativas:
      if (quantErros >= 6) {
        texto.innerHTML = palavra.toUpperCase();

        if (confirm("Você perdeu.\nDeseja iniciar um novo jogo?")) {
          iniciarJogo();
          restartJogo();
          //button();
        } else {
          ev.target.disabled = true;
        }
      } else {
        ev.target.select();
        elErro.innerHTML = erros
          .sort()
          .join("")
          .toUpperCase();

        texto.innerHTML = str.join("").toUpperCase();

        if (acertos == palavra.length) {
          if (confirm("Você venceu.\nDeseja iniciar um novo jogo?")) {
            iniciarJogo();
            restartJogo();
            //button();
          } else {
            ev.target.disabled = true;
          }
        }
        ev.target.value = "";
      }
    }
  }
};

btnIniciarNovamente.onclick = () => {
  iniciarJogo();
  restartJogo();
};

//

iniciarJogo();
