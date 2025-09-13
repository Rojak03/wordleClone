addEventListener("keyup", (event) => { 
    console.log(event);
    document.getElementById("item1").innerText = event.key;
})