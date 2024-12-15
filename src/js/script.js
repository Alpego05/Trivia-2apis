const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const submit = document.getElementById("submit");


const ruta = "https://opentdb.com/api.php?amount=1";

const cargarAsy = async () => {
    const datos = await fetch(ruta); 
    let datosjson = await datos.json(); // Convierte a JSON
    console.log(datosjson); 

    const results = datosjson.results; // Almacena los resultados
    ShowAnswers(results); // Llama a ShowAnswers con los resultados

    return results; 
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
        }
    });
};



document.addEventListener("DOMContentLoaded", loadPexelsImage);













// 0:
// category : "Entertainment: Video Games"
// correct_answer : "October 31st, 2019"
// difficulty : "easy"
// incorrect_answers : (3) ['January 13th, 2019', 'September 6th, 2018', 'October 1st, 2019']
// question : "When was &quot;Luigi&#039;s Mansion 3&quot; released?"
// type : "multiple"