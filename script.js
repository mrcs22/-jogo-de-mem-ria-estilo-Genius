import createHtmlElement from "./utils/createHtmlElement.js";
import setGameUp  from "./game/index.js"

const rootHtmlElement = document.getElementById("root");


const renderGameScreen = () => {
const mainGameDiv = createHtmlElement("div", "main-game")

const gameDiv = createHtmlElement("div", "genius")

const redOptionDiv = createHtmlElement("div", "red");
const greenOptionDiv = createHtmlElement("div", "green");
const blueOptionDiv = createHtmlElement("div", "blue");
const yellowOptionDiv = createHtmlElement("div", "yellow");

gameDiv.appendChild(redOptionDiv)
gameDiv.appendChild(greenOptionDiv)
gameDiv.appendChild(blueOptionDiv)
gameDiv.appendChild(yellowOptionDiv)

mainGameDiv.appendChild(gameDiv)
rootHtmlElement.appendChild(mainGameDiv)
}

renderGameScreen()

setGameUp().play()




