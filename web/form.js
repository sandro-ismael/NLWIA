import {server} from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")
const copyButton = document.querySelector("#copy-button")


form.addEventListener("submit", async(event) =>{
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value
  
  if(!videoURL.includes("shorts")){
    return (content.textContent = "ESSE VIDEO NÃO É UM SHORTS.")
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split ("?si")

  content.textContent = "Obtendo o texto do audio..."

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo, aguarde..."

  const summary = await server.post("/summary", { 
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  copyButton.style.display = "block"
  
  content.classList.remove("placeholder")
})

