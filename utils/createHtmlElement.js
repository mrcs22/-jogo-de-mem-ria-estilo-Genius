export default function createHtmlElement(tagName, className){
    const htmlElement = document.createElement(tagName)
    className && htmlElement.classList.add(className)
  
    return htmlElement
  }