document.addEventListener("keyup", (event) => { 
    console.log(event);
    if (isLetter(event.key)){
      handleInput(event.key);
    }
    else if (event.key === "Backspace"){
    }
    else if (event.key === "Enter"){
    }


})
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
function handleInput(key){


}