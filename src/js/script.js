const trans = document.getElementById("trans");
const submit = document.getElementById("submit");
const result = document.getElementById("result");

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
    results.forEach(item => {
        if (item.type === "multiple") {
            console.log("respuesta múltiple");
        } else {
            console.log("respuesta simple");
        }
    });
};


document.addEventListener("DOMContentLoaded", cargarAsy);
// 0:
// category : "Entertainment: Video Games"
// correct_answer : "October 31st, 2019"
// difficulty : "easy"
// incorrect_answers : (3) ['January 13th, 2019', 'September 6th, 2018', 'October 1st, 2019']
// question : "When was &quot;Luigi&#039;s Mansion 3&quot; released?"
// type : "multiple"