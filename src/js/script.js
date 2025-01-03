const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const img_container = document.getElementById("img_container");
const submit = document.getElementById("submit");
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const num_answer = document.getElementById("num_answer");


let true_asnwer; // variable to store the correct answer
let attemps; //para contar las veces que se pulsa una respuesta, hay 2 intentos
let cont_questions = 0; //contar numero de pregunta
let correct_asnwers = 0; //preguntas acertadas
let wrong_answers = 0; //pregntas no acertadas

const ruta_trivia = "https://opentdb.com/api.php?&amount=5";
//category=13 para modificar la categoría

const cargarAsy_img = async (keyword) => {
    //usamos la apikey
    let api_key = "f803e8b71325d2d2c06ef563fd9e9f44";
    const ruta_img = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&text=${keyword}&format=json&nojsoncallback=1&per_page=1`;

    try {
        const datos = await fetch(ruta_img);
        const datosjson = await datos.json();

        if (datosjson.photos.photo.length > 0) {
            const photo = datosjson.photos.photo[0];
            const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
            const img = document.createElement("img");
            img.src = photoUrl;

            img_container.innerHTML = "";
            img_container.appendChild(img);
        } else {
            console.log("No se encontraron fotos");
        }
    } catch (error) {
        console.error("Error al cargar la imagen:", error);
    }
};

const cargarAsy_question = async () => {
    const datos = await fetch(ruta_trivia);
    let datosjson = await datos.json(); // convierte a JSON
    console.log(datosjson);

    const results = datosjson.results; // resultados
    ShowAnswers(results);
};

const ShowAnswers = (results) => {
    let keyword;
    attemps = 0; // reinicia el conteo de intentos

    //reiniciamos los colores de los background de las opciones
    for (const answer of answers.children) {
        answer.style.background = "transparent";
    }

    //incrementamos el numero de la pregunta
    cont_questions++;
    num_answer.textContent = cont_questions;


    
    for (const result of results) {
        if (result.type === "multiple") {
            const allAnswers = [...result.incorrect_answers];
            allAnswers.push(result.correct_answer);
            allAnswers.sort(() => Math.random() - 0.5);

            question.innerHTML = result.question;
            option1.innerHTML = allAnswers[0];
            option2.innerHTML = allAnswers[1];
            option3.innerHTML = allAnswers[2];
            option4.innerHTML = allAnswers[3];

            switch (result.category) {
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

            correct_answer = result.correct_answer;
            console.log("respuesta correcta: " + correct_answer); //respuesta correcta
            console.log("imagen:", keyword); //establecemos la palabra clave que recibirá el metodo de carga de la api de las imagenes


            cargarAsy_img(keyword);
            break;
        }
    }
};


const checkAnswers = (event) => {
    let choosenAnswer = event.target;

    if (event.target.tagName === "BUTTON")
        if (choosenAnswer.textContent === correct_answer) {
            console.log("Respuesta correcta");
            event.target.style.background = "green";
            //desabilitamos los otros botones
            for (const answer of answers.children) {
                answer.disabled = true;
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
                for (const answer of answers.children) {
                    if (answer.textContent === correct_answer) {
                        answer.style.background = "green";
                    }
                    setTimeout(cargarAsy_question, 2000);
                }
            }
        }
    }





document.addEventListener("DOMContentLoaded", cargarAsy_question); //metodo para cargar la pregunta
answers.addEventListener("click", checkAnswers); //metodo para comprobar la respuesta.

// // 0:
// // category : "Entertainment: Video Games"
// // correct_answer : "October 31st, 2019"
// // difficulty : "easy"
// // incorrect_answers : (3) ['January 13th, 2019', 'September 6th, 2018', 'October 1st, 2019']
// // question : "When was &quot;Luigi&#039;s Mansion 3&quot; released?"
// // type : "multiple"