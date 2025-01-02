const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const submit = document.getElementById("submit");


const ruta_trivia = "https://opentdb.com/api.php?category=15&amount=1";

const cargarAsy_question = async () => {
    const datos = await fetch(ruta_trivia); 
    let datosjson = await datos.json(); // convierte a JSON
    console.log(datosjson); 

    const results = datosjson.results; // resultados
    ShowAnswers(results);
    cargarAsy_img();
    return results; 
};

const ruta_img = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f803e8b71325d2d2c06ef563fd9e9f44&text=gatos&format=json&nojsoncallback=1&per_page=1";

const cargarAsy_img = async () => {
    try {
        const datos = await fetch(ruta_img);
        let datosjson = await datos.json(); 

        console.log(datosjson);
    } catch (error) {

        console.error("Error al cargar los datos:", error);
    }
};





const ShowAnswers = (results) => {
    results.forEach(result => {
        if (result.type === "multiple") {
            console.log("respuesta múltiple");

            // Crear un arreglo con todas las respuestas
            const allAnswers = [...result.incorrect_answers];
            allAnswers.push(result.correct_answer);

            // Mezclar las respuestas aleatoriamente
            allAnswers.sort(() => Math.random() - 0.5);

            // Mostrar la pregunta y las opciones en el DOM
            document.getElementById("result").innerHTML = result.question;
            option1.innerHTML = allAnswers[0];
            option2.innerHTML = allAnswers[1];
            option3.innerHTML = allAnswers[2];
            option4.innerHTML = allAnswers[3];
        } else {
            console.log("respuesta simple");
            cargarAsy_question();
        }
    });
};


document.addEventListener("DOMContentLoaded", cargarAsy_question);













// 0:
// category : "Entertainment: Video Games"
// correct_answer : "October 31st, 2019"
// difficulty : "easy"
// incorrect_answers : (3) ['January 13th, 2019', 'September 6th, 2018', 'October 1st, 2019']
// question : "When was &quot;Luigi&#039;s Mansion 3&quot; released?"
// type : "multiple"