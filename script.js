const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const fim = document.querySelector(".fim");
const restart = document.querySelector(".restart");
const pontuacao0 = document.querySelector(".pontuacao");

let pontuacao = 0;
let loop = null;
let pontuar = null;

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

function iniciarPontuacao() {
  clearInterval(pontuar);
  pontuar = setInterval(() => {
    pontuacao += 1;
    pontuacao0.textContent = "Pontuação: " + pontuacao;
  }, 100);
}

function iniciarJogo() {
  loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    if (pipePosition <= 96 && pipePosition > 0 && marioPosition <= 90) {
      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;

      mario.src = "./images/game-over.png";
      mario.style.width = "70px";
      mario.style.marginLeft = "40px";

      fim.style.display = "flex";

      clearInterval(loop);
      clearInterval(pontuar);
    }
  }, 10);
}

function reiniciarJogo() {
  clearInterval(loop);
  pontuacao = 0;
  iniciarPontuacao();

  pipe.style.animation = "pipe-animation 1.5s infinite linear";
  pipe.style.left = "";

  mario.src = "./images/mario.gif";
  mario.style.width = "120px";
  mario.style.marginLeft = "0";

  mario.style.bottom = "0";
  mario.style.animation = "";

  fim.style.display = "none";

  iniciarJogo();
}

document.addEventListener("keydown", jump);

restart.addEventListener("click", reiniciarJogo);

iniciarJogo();
iniciarPontuacao();
