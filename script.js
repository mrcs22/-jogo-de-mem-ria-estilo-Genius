import createHtmlElement from "./utils/createHtmlElement.js";
import setGameUp  from "./game/index.js"

const rootHtmlElement = document.getElementById("root");


renderInicialScren()

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

  signInForm.addEventListener("submit", (e) => submitForm(nameInput.value, passwordInput.value, isLogin, e))

  signInForm.appendChild(nameInput)
  signInForm.appendChild(passwordInput)
  signInForm.appendChild(submitInput)
  signInForm.appendChild(changeFormButton)

  rootHtmlElement.appendChild(signInForm)
}

async function submitForm (username, password, isLogin, e) {
  e.preventDefault()

  const url = `http://localhost:4000/${isLogin? "sign-in": "sign-up"}`

  axios.post(url,{username, password})
  .then(({data})=>{
    if(!isLogin) return renderInicialScren()

    renderGameScreen()
    setGameUp(data.token).play()
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







