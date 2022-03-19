let order = [];
let clickedOrder = [];
let score = 0;

function setGameUp(){
const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");


const shuffleOrder = () => {
  const colorOrder = Math.floor(Math.random()*4);
  order.push(colorOrder);
  clickedOrder = [];

  for(const i in order){
    const elementColor = getColorHtmlElement(order[i]);
    lightColor(elementColor, Number(i) + 1 );
  }
}

const lightColor = (element, number) =>{
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
  }, number - 250);

  setTimeout(()=>{
    element.classList.remove("selected");
  }, number)
}

const checkOrder = () =>{
  for(const i in clickedOrder){
    if(clickedOrder[i] != order[i]){
      gameOver();
      break;
    }
  }

  if(clickedOrder.length == order.length){
    nextLevel();
  }
}

const selectOrder = (color) =>{
  clickedOrder[clickedOrder.length] = color;
  getColorHtmlElement(color).classList.add("selected");

  setTimeout(()=>{
    getColorHtmlElement(color).classList.remove("selected");
    checkOrder();
  },250 )

  
}

const getColorHtmlElement = (color) =>{
  const colorHtmlsElements ={
    0: green,
    1: red,
    2: yellow,
    3: blue
  }

  return colorHtmlsElements[color]
}

const nextLevel = () =>{
  score++;
  shuffleOrder();
}

const gameOver = () =>{
 alert(`Você Errou. Score: ${score}`)

  order = [];
  clickedOrder = [];
}

let playGame = () =>{
  score = 0;

  setTimeout(nextLevel, 500)
}

green.addEventListener("click", () => selectOrder(0));
red.addEventListener("click", () => selectOrder(1));
yellow.addEventListener("click", () => selectOrder(2));
blue.addEventListener("click", () => selectOrder(3));

return {play: () => playGame()}
}

export default setGameUp;