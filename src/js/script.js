//bloques principales
const game = document.getElementById('game');
const results = document.getElementById('results');


const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const img_container = document.getElementById("img_container");
// const submit = document.getElementById("submit"); /* not used */
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const num_answer = document.getElementById("num_answer");

//parte de los resultados
const correcthtml = document.getElementById("correctAnswers");
const incorrecthtml = document.getElementById("incorrectAnswers");
const luckyhtml = document.getElementById("luckyAnswers");

//import objeto preguntas
import "./questions.js";

let correct_answer; // variable to store the correct answer 
let attemps; //para contar las veces que se pulsa una respuesta, hay 2 intentos
let cont_questions = 0; //contar numero de pregunta
let correct_answers = 0; //preguntas acertadas 
let wrong_answers = 0; //pregntas no acertadas 
let lucky_answers = 0; //preguntas acertadas por suerte

console.log("dificultad del trivia: " + localStorage.getItem("difficulty"));
let difficulty = localStorage.getItem("difficulty");

const ruta_trivia = `https://opentdb.com/api.php?&amount=5&difficulty=${difficulty}`;
//category=13 para modificar la categoría

//función para conseguir las preguntas de la api del trivia
//documentación: https://opentdb.com/api_config.php  // api libre
const cargarAsy_question = async () => {
    const datos = await fetch(ruta_trivia);
    let datosjson = await datos.json(); // convierte a JSON
    console.log(datosjson);


    const results = datosjson.results; // resultados
    const questions = results.map(result => newQuestion(result)); //llama a la funcion dentro de questions.js para crear el objeto pregunta
    console.log(questions);

    ShowAnswers(results); //a questions.js
};


//función para mostrar las preguntas y respuestas del juego
const ShowAnswers = (questions) => {

    let keyword;
    attemps = 0; //conteo de intentos

    // reinicio de los colores de los botones // metodo?
    for (const answer of answers.children) {
        answer.style.background = "transparent";
    }

    //recorremos el array de objetos obtenidos de questions.js
    for (const questionObj of questions) {
        //filtramos las preguntas para que solo salgan de multiple respuesta
        if (questionObj.type == "multiple") {
            const allAnswers = [...questionObj.incorrect_answers];
            allAnswers.push(questionObj.correct_answer);
            allAnswers.sort(() => Math.random() - 0.5);

            question.innerHTML = questionObj.question;
            option1.innerHTML = allAnswers[0];
            option2.innerHTML = allAnswers[1];
            option3.innerHTML = allAnswers[2];
            option4.innerHTML = allAnswers[3];

            // Definir palabra clave según la categoría, si no no funciona, las imagenes cambian
            switch (questionObj.category) {
                case "General Knowledge":
                    keyword = "museo";
                    break;

                case "Entertainment: Books":
                    keyword = "libro";
                    break;


                case "Entertainment: Film":
                    keyword = "peliculas";
                    break;


                case "Entertainment: Music":
                    keyword = "piano"; //es rara
                    break;

                case "Entertainment: Musicals &amp; Theatres": //revisar
                    keyword = "Shakespeare";
                    break;

                case "Entertainment: Television":
                    keyword = "telecinco";
                    break;

                case "Entertainment: Video Games":
                    keyword = "pokemon";
                    break;

                case "Entertainment: Board Games":
                    keyword = "Boardgame";
                    break;

                case "Science & Nature":
                    keyword = "Nature";
                    break;

                case "Science: Computers":
                    keyword = "teclado";
                    break;

                case "Science: Mathematics":
                    keyword = "matematicas";
                    break;

                case "Mythology":
                    keyword = "Zeus";
                    break;

                case "Sports":
                    keyword = "futbol";
                    break;

                case "Geography":
                    keyword = "mapamundi";
                    break;

                case "History":
                    keyword = "Mapa de españa";
                    break;

                case "Politics":
                    keyword = "Pedro Sanchez";
                    break;

                case "Art":
                    keyword = "escultura";
                    break;

                case "Celebrities":
                    keyword = "Kidd Keo";
                    break;

                case "Animals":
                    keyword = "Rubius";
                    break;

                case "Vehicles":
                    keyword = "coche";
                    break;

                case "Entertainment: Comics":
                    keyword = "Joker";
                    break;

                case "Science: Gadgets":
                    keyword = "cacerola";
                    break;

                case "Entertainment: Japanese Anime &amp; Manga":
                    keyword = "Goku";
                    break;

                case "Entertainment: Cartoon &amp; Animations":
                    keyword = "Inazuma eleven";
                    break;

                default:
                    keyword = "perros";
            }

            // incrementar el contador de preguntas para luego mostrarlo
            cont_questions++;
            num_answer.textContent = cont_questions;

            //10 preguntas => fin del juego
            if (cont_questions > 10) {
                console.log("Reinicio");
                showResults(); //metodo para mostrar los resultados del juego
            }

            // establecer la respuesta correcta y cargar la imagen desde la api 
            correct_answer = questionObj.correct_answer;
            console.log("Respuesta correcta:", correct_answer);
            console.log("Imagen:", keyword);

            cargarAsy_img(keyword);
            break; // Salimos tras mostrar la primera pregunta
        }
    }

}

//función para cargar las imagenes de la api
//documentación: https://www.flickr.com/services/api/
const cargarAsy_img = async (keyword) => {
    //usamos la apikey
    let api_key = "f803e8b71325d2d2c06ef563fd9e9f44";
    const ruta_img = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&text=${keyword}&format=json&nojsoncallback=1&per_page=1`;

    try {
        const datos = await fetch(ruta_img);
        const datosjson = await datos.json();

        if (datosjson.photos.photo.length > 0) {
            const photo = datosjson.photos.photo[0];

            //construccion de la url
            const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
            //creaciión de la imagen con la url construida
            const img = document.createElement("img");
            img.src = photoUrl;

            //borramos la imagen anterior para que no se junten
            img_container.innerHTML= "";
            img_container.appendChild(img);

        } else {
            console.log("No se encontraron fotos");
        }
    } catch (error) {
        console.error("Error al cargar la imagen:", error);
    }
};


// let correct_answers = 0; //preguntas acertadas 
// let wrong_answers = 0; //pregntas no acertadas 
// let lucky_answers = 0; //preguntas acertadas por suerte

//función para revisar las respuestas
const checkAnswers = (event) => {
    let choosenAnswer = event.target;

    if (event.target.tagName === "BUTTON") {
        if (choosenAnswer.textContent === correct_answer) {
            console.log("Respuesta correcta");
            event.target.style.background = "green";
            //desabilitamos los otros botones
            for (const answer of answers.children) {
                answer.disabled = true;
            }
           
            //incrementamos los aciertos, no aciertos, y aciertos por suerte
            //localstorage
            if(attemps == 1) {
                lucky_answers++;
                localStorage.setItem('luckyAnswers', lucky_answers);
            }else{
                correct_answers++;
                localStorage.setItem('correctAnswers', correct_answers);
            }

             //vuelve a cargar otra pregunta
            setTimeout(() => {
                cargarAsy_question();
                for (const answer of answers.children) {
                    answer.disabled = false;
                }
            }, 2000);
        } else {
            console.log("Respuesta incorrecta");
            event.target.style.background = "red";
            attemps++;
            if (attemps < 2) {
                console.log("Tienes otro intento");
            } else {
                //localstorage
                wrong_answers++;
                localStorage.setItem('wrongAnswers', wrong_answers);

                for (const answer of answers.children) {
                    if (answer.textContent === correct_answer) {
                        answer.style.background = "green";
                    }
                    setTimeout(cargarAsy_question, 3000);
                }
            }
        }
    }
}

// const correcthtml = document.getElementById("correctAnswers");
// const incorrecthtml = document.getElementById("incorrectAnswers");
// const luckyhtml = document.getElementById("luckyAnswers");

//funcion para mostrar los resultados una vez acabado el juego
const showResults = () => {
    game.style.display = "none";
    results.style.display = "block";

    let correct = localStorage.getItem('correctAnswers');
    let wrong = localStorage.getItem('wrongAnswers');
    let lucky = localStorage.getItem('luckyAnswers');

    correcthtml.textContent = correct;
    incorrecthtml.textContent = wrong;
    luckyhtml.textContent = lucky;

}


document.addEventListener("DOMContentLoaded", cargarAsy_question); //función para cargar la pregunta
answers.addEventListener("click", checkAnswers); //función para comprobar la respuesta.

//metodo para desactivar results cuando se inicia la página
document.addEventListener("DOMContentLoaded" , () => {
    results.style.display = "none";
})

// //metodo para guardar la dificultad en el localstorage
// startTrivia.addEventListener("click", () => {
//     console.log(difficulty.value)
//     localStorage.setItem("difficulty", difficulty.value);
// });



// // 0:
// // category : "Entertainment: Video Games"
// // correct_answer : "October 31st, 2019"
// // difficulty : "easy"
// // incorrect_answers : (3) ['January 13th, 2019', 'September 6th, 2018', 'October 1st, 2019']
// // question : "When was &quot;Luigi&#039;s Mansion 3&quot; released?"
// // type : "multiple"


//enseñar preguntas sin usar objetos **no se usa**
// const ShowAnswers = (results) => {

//     let keyword;
//     attemps = 0; // reinicia el conteo de intentos

//     //reiniciamos los colores de los background de las opciones
//     for (const answer of answers.children) {
//         answer.style.background = "transparent";
//     }
//     for (const result of results) {
//         if (result.type === "multiple") {
//             const allAnswers = [...result.incorrect_answers];
//             allAnswers.push(result.correct_answer);
//             allAnswers.sort(() => Math.random() - 0.5);

//             question.innerHTML = result.question;
//             option1.innerHTML = allAnswers[0]; 
//             option2.innerHTML = allAnswers[1];
//             option3.innerHTML = allAnswers[2];
//             option4.innerHTML = allAnswers[3];

//             switch (result.category) {
//                 case "General Knowledge":
//                     keyword = "museo";
//                     break;

//                 case "Entertainment: Books":
//                     keyword = "libro";
//                     break;


//                 case "Entertainment: Film":
//                     keyword = "peliculas";
//                     break;


//                 case "Entertainment: Music":
//                     keyword = "piano"; //es rara
//                     break;

//                 case "Entertainment: Musicals &amp; Theatres": //revisar
//                     keyword = "Shakespeare";
//                     break;

//                 case "Entertainment: Television":
//                     keyword = "telecinco";
//                     break;

//                 case "Entertainment: Video Games":
//                     keyword = "pokemon";
//                     break;

//                 case "Entertainment: Board Games":
//                     keyword = "Boardgame";
//                     break;

//                 case "Science & Nature":
//                     keyword = "Nature";
//                     break;

//                 case "Science: Computers":
//                     keyword = "teclado";
//                     break;

//                 case "Science: Mathematics":
//                     keyword = "matematicas";
//                     break;

//                 case "Mythology":
//                     keyword = "Zeus";
//                     break;

//                 case "Sports":
//                     keyword = "futbol";
//                     break;

//                 case "Geography":
//                     keyword = "mapamundi";
//                     break;

//                 case "History":
//                     keyword = "Mapa de españa";
//                     break;

//                 case "Politics":
//                     keyword = "Pedro Sanchez";
//                     break;

//                 case "Art":
//                     keyword = "escultura";
//                     break;

//                 case "Celebrities":
//                     keyword = "Kidd Keo";
//                     break;

//                 case "Animals":
//                     keyword = "Rubius";
//                     break;

//                 case "Vehicles":
//                     keyword = "coche";
//                     break;

//                 case "Entertainment: Comics":
//                     keyword = "Joker";
//                     break;

//                 case "Science: Gadgets":
//                     keyword = "cacerola";
//                     break;

//                 case "Entertainment: Japanese Anime &amp; Manga":
//                     keyword = "Goku";
//                     break;

//                 case "Entertainment: Cartoon &amp; Animations":
//                     keyword = "Inazuma eleven";
//                     break;

//                 default:
//                     keyword = "perros";
//             }

//             //incrementamos el numero de la pregunta
//             cont_questions++;
//             num_answer.textContent = cont_questions;
//             if (cont_questions > 10) {
//                 console.log("reinicio")
//                 location.href = 'results.html'
//             }

//             //******************************** */
//             correct_answer = result.correct_answer;
//             console.log("respuesta correcta: " + correct_answer); //respuesta correcta
//             console.log("imagen:", keyword); //establecemos la palabra clave que recibirá el metodo de carga de la api de las imagenes


//             cargarAsy_img(keyword);
//             break;
//         }
//     }
// };