let order = [];
let clickedOrder = [];
let score = 0;

function setGameUp(userToken, renderScoresTable, api){
const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

const axiosConfig = {headers:{authorization: `Bearer ${userToken}`}}

const startButton = document.querySelector(".start-button")

const shuffleOrder = () => {
  api.get("/moves", axiosConfig)
  .then(({data})=>{
    order.push(data.nextMove);
    clickedOrder = [];
  
    for(const i in order){
      const elementColor = getColorHtmlElement(order[i]);
      lightColor(elementColor, Number(i) + 1 );
    }

    startButton.innerHTML = "Recomeçar" 
  })
  .catch(()=>{
    alert("Algo deu errado 2");
    startButton.innerHTML = "Começar"
  })

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

  if(clickedOrder.length == order.length ){
    let nextMove = "end";
    
    if(order.length > 0) nextMove = clickedOrder[clickedOrder.length -1]
    
    startButton.innerHTML = "Carregando"
   
    api.post(`/moves/${nextMove}`,{}, axiosConfig)
   .then(nextLevel)
   .catch(()=>alert("Algo deu errado 2"))
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

 startButton.innerHTML="Recomeçar"
 renderScoresTable()

  order = [];
  clickedOrder = [];
}

const playGame = () =>{
  score = 0;

  startButton.innerHTML = "Carregando"

  setTimeout(nextLevel, 500)
}

startButton.addEventListener("click", playGame)

green.addEventListener("click", () => selectOrder(0));
red.addEventListener("click", () => selectOrder(1));
yellow.addEventListener("click", () => selectOrder(2));
blue.addEventListener("click", () => selectOrder(3));

return {play: () => playGame()}
}

export default setGameUp;