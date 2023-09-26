async function copy() {
  const text = document.querySelector("#content")
  navigator.clipboard.writeText(text.textContent);
  alert("Resumo copiado");
}
