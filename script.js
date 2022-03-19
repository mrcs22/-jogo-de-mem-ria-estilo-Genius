import createHtmlElement from "./utils/createHtmlElement.js";
import setGameUp  from "./game/index.js"

const rootHtmlElement = document.getElementById("root");

renderInicialScren()

function renderInicialScren (isLogin = true, lastForm) {
  if(lastForm) rootHtmlElement.removeChild(lastForm)

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
  changeFormButton.addEventListener("click", () =>renderInicialScren(!isLogin, signInForm))

  signInForm.addEventListener("submit", (e) => submitForm(nameInput.value, passwordInput.value, isLogin, e))

  signInForm.appendChild(nameInput)
  signInForm.appendChild(passwordInput)
  signInForm.appendChild(submitInput)
  signInForm.appendChild(changeFormButton)

  rootHtmlElement.appendChild(signInForm)
}

function submitForm (name, password, isLogin, e) {
  e.preventDefault()

  if(!isLogin) return
  
  renderGameScreen()
  setGameUp().play()
}

function renderGameScreen () {
  rootHtmlElement.innerHTML = ""
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







