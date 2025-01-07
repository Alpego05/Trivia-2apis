//variables de index.html
const difficulty = document.getElementById("difficulty");
const startTrivia = document.getElementById("startTrivia");

//metodo para guardar la dificultad en el localstorage
startTrivia.addEventListener("click", () => {
    console.log(difficulty.value)
    localStorage.setItem("difficulty", difficulty.value);
});