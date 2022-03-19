export default function createHtmlElement(tagName, className){
    const htmlElement = document.createElement(tagName)
    htmlElement.classList.add(className)
  
    return htmlElement
  }