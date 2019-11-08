//Declaração das variáveis:
var aleatorio,
  elRand,
  palavra,
  trr,
  str,
  quantErros = 0,
  acertos = 0,
  dica = "",
  nomeDaCategoria = "",
  erros = [];

const CAMINHO = "/assets/images/";
const imagem = document.getElementById("imagem");
const elErro = document.getElementById("erros");
const texto = document.getElementById("get-linhas");
const elEntradaLetra = document.getElementById("letra");
const btnIniciarNovamente = document.getElementById("btn-iniciar-novamente");

/**
 Banco de dados:
*/

const db = {
  frutas: [
    { palavra: "manga", dica: "Há épocas em que tem bastante" },
    { palavra: "tangerina", dica: "Tem em todo lugar" },
    { palavra: "banana", dica: "Tem em todo lugar" },
    { palavra: "uva", dica: "Tem em todo lugar" },
    { palavra: "pêssego", dica: "Tem em todo lugar" },
    { palavra: "melancia", dica: "Tem em todo lugar" },
    { palavra: "melão", dica: "Tem em todo lugar" },
    { palavra: "carambola", dica: "Tem em todo lugar" },
    { palavra: "morango", dica: "Tem em todo lugar" },
    { palavra: "laranja", dica: "Tem em todo lugar" },
    { palavra: "pitomba", dica: "Tem em todo lugar" }
  ],
  casa: [
    { palavra: "mesa", dica: "Tem em todo lugar" },
    { palavra: "cadeira", dica: "Tem em todo lugar" },
    { palavra: "geladeira", dica: "Tem em todo lugar" },
    { palavra: "rack", dica: "Tem em todo lugar" },
    { palavra: "televisão", dica: "Tem em todo lugar" },
    { palavra: "fogão", dica: "Tem em todo lugar" },
    { palavra: "cama", dica: "Tem em todo lugar" },
    { palavra: "travesseiro", dica: "Tem em todo lugar" },
    { palavra: "guarda-roupa", dica: "Tem em todo lugar" },
    { palavra: "tv", dica: "Tem em todo lugar" },
    { palavra: "porta", dica: "Tem em todo lugar" },
    { palavra: "janela", dica: "Tem em todo lugar" },
    { palavra: "armário", dica: "Tem em todo lugar" },
    { palavra: "sofá", dica: "Tem em todo lugar" },
    { palavra: "dvd", dica: "Tem em todo lugar" },
    { palavra: "som", dica: "Tem em todo lugar" },
    { palavra: "controle-remoto", dica: "Tem em todo lugar" },
    { palavra: "computador", dica: "Tem em todo lugar" }
  ]
};

//Pega um valor aleatório no banco de dados.

function iniciarJogo() {
  nomeDaCategoria = "frutas";

  //aleatorio = getRandomIntInclusive(0, palavras.length - 1);
  var categoria = Object.values(db[nomeDaCategoria]);

  categoria = categoria.sort((a, b) => {
    return 0.5 - Math.random();
  });

  var rand = categoria[Math.floor(Math.random() * categoria.length)];

  palavra = rand.palavra;

  document.getElementById(
    "get-name-category"
  ).innerHTML = `<div class="dicas">Categoria: 
  <strong>${nomeDaCategoria.toUpperCase()}</strong> <br>
    Dica: <strong>${rand.dica}</strong></div>
    `;

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

        //Quando o usuário vence:
        if (acertos == palavra.length) {
          if (confirm("Você venceu.\nDeseja iniciar um novo jogo?")) {
            iniciarJogo();
            restartJogo();
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
