import createHtmlElement from "./utils/createHtmlElement.js";
import setGameUp  from "./game/index.js"

const rootHtmlElement = document.getElementById("root");

const api = axios.create({
  baseURL: "https://genius-mysql-api.herokuapp.com/",
});

renderInicialScren()
renderScoresTable()

function renderInicialScren (isLogin = true) {
  rootHtmlElement.innerHTML = ""

  const signInForm = createHtmlElement("form");

  const nameInput = createHtmlElement("input");
  nameInput.setAttribute("type","text")
  nameInput.setAttribute("placeholder", "nome");

  const passwordInput = createHtmlElement("input");
  passwordInput.setAttribute("type","password")
  passwordInput.setAttribute("placeholder", "senha");

  const submitInput = createHtmlElement("input");
  submitInput.setAttribute("type","submit")
  submitInput.setAttribute("value", isLogin? "entrar" : "cadastrar");

  const changeFormButton = createHtmlElement("button");
  changeFormButton.innerHTML = isLogin? "Ou cadastre-se" : "Ou entre";
  changeFormButton.addEventListener("click", () =>renderInicialScren(!isLogin))

  signInForm.addEventListener("submit", (e) => submitForm(nameInput.value, passwordInput.value, isLogin, submitInput, e))

  signInForm.appendChild(nameInput)
  signInForm.appendChild(passwordInput)
  signInForm.appendChild(submitInput)
  signInForm.appendChild(changeFormButton)

  rootHtmlElement.appendChild(signInForm)
}

async function submitForm (username, password, isLogin,formSubmitButton, e) {
  e.preventDefault()

  formSubmitButton.setAttribute("value", "Aguarde");

  const endpoint = `/${isLogin? "sign-in": "sign-up"}`

  api.post(endpoint,{username, password})
  .then(({data})=>{
    if(!isLogin) return renderInicialScren()

    renderGameScreen()
    setGameUp(data.token, renderScoresTable, api)
  })
  .catch(()=>{
    alert("algo deu errado")
    formSubmitButton.setAttribute("value", isLogin? "entrar" : "cadastrar");
  })
   
}

function renderScoresTable(){
  const table = document.querySelector("table")
  table.innerHTML = ""

  const usernameTableHeader = createHtmlElement("th")
  usernameTableHeader.innerHTML = "username"
  
  const scoreTableHeader = createHtmlElement("th") 
  scoreTableHeader.innerHTML="score"
  
  table.appendChild(usernameTableHeader)
  table.appendChild(scoreTableHeader)

  api.get(`/scores/top`)
  .then(({data})=>{
    data.forEach(d=>{
      const tableRow = createHtmlElement("tr");

      const usernameTableColumn = createHtmlElement("td")
      const pointsTableColumn = createHtmlElement("td")

      usernameTableColumn.innerHTML = d.username;
      pointsTableColumn.innerHTML = d.points;

      tableRow.appendChild(usernameTableColumn)
      tableRow.appendChild(pointsTableColumn)
      table.appendChild(tableRow)

    })
  
  })
  .catch(()=>{
    alert("algo deu errado")
  })

}

function renderGameScreen () {
  rootHtmlElement.innerHTML = ""
  const mainGameDiv = createHtmlElement("div", "main-game")

  const gameDiv = createHtmlElement("div", "genius")

  const redOptionDiv = createHtmlElement("div", "red");
  const greenOptionDiv = createHtmlElement("div", "green");
  const blueOptionDiv = createHtmlElement("div", "blue");
  const yellowOptionDiv = createHtmlElement("div", "yellow");

  const startButton = createHtmlElement("button", "start-button");
  startButton.innerHTML="Começar"

  gameDiv.appendChild(redOptionDiv)
  gameDiv.appendChild(greenOptionDiv)
  gameDiv.appendChild(blueOptionDiv)
  gameDiv.appendChild(yellowOptionDiv)

  mainGameDiv.appendChild(gameDiv)
  mainGameDiv.appendChild(startButton)
  rootHtmlElement.appendChild(mainGameDiv)
}







