let order = [];
let clickedOrder = [];
let score = 0;

// 0 = verde
// 1 = vermelho
// 2 = amarelo
// 3 = azul

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random()*4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for(let i in order){
    let elementColor = createElement(order[i]);
    lightColor(elementColor, Number(i) + 1 );
  }
}

let lightColor = (element, number) =>{
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
  }, number - 250);
  setTimeout(()=>{
    element.classList.remove("selected");
  })
}

let checkOrder = () =>{
  for(let i in clickedOrder){
    if(clickedOrder[i] != order[i]){
      gameOver();
      break;
    }
  }
  if(clickedOrder.length == order.length){
    alert(`Pontuação: ${score}\n Você acertou! Iniciando próximo nível!`);
    nextLevel();

  }
}

let click = (color) =>{
  clickedOrder[clickedOrder.length] = color;
  createElement(color).classList.add("selected");

  setTimeout(()=>{
    createElement(color).classList.remove("selected");
    checkOrder();
  },250 )

  
}

let createElement = (color) =>{
  if(color == 0){
    return green;
  } else if(color ==1){
    return red
  }else if(color == 2){
    return yellow;
  } else {
    return blue;
  }
}

let nextLevel = () =>{
  score++;
  shuffleOrder();
}

let gameOver = () =>{
  alert(` Pontuação: ${score}!\n Você perdeu!\n Clique em "ok" para iniciar um novo jogo.`);
  order = [];
  clickedOrder = [];

  playGame();
}

let playGame = () =>{
 alert(`Bem vindo ao Gênesis! Iniciando jogo!`);
  score = 0;

  nextLevel();
}

green.addEventListener("click", () => click(0));
red.addEventListener("click", () => click(1));
yellow.addEventListener("click", () => click(2));
blue.addEventListener("click", () => click(3));


playGame();