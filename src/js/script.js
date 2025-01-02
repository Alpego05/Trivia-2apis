const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const img_container = document.getElementById("img_container");
const submit = document.getElementById("submit");
const question = document.getElementById("question");

const ruta_trivia = "https://opentdb.com/api.php?category=11&amount=5";

const cargarAsy_img = async (keyword) => {
    const ruta_img = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f803e8b71325d2d2c06ef563fd9e9f44&text=${keyword}&format=json&nojsoncallback=1&per_page=1`;

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
            console.log("No se encontraron fotos.");
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

            switch(result.category) {
                case "General Knowledge":
                    keyword = "museo";
                    break;

                case "Entertainment: Books":
                    keyword = "libro";
                    break;

                    //-----------------------------------------------------------------------------------------------------------------------
                case "Entertainment: Film":
                    keyword = "netfix";
                    break;

                case "Entertainment: Music":
                    keyword = "Music";
                    break;

                case "Entertainment: Musicals & Theatres":
                    keyword = "Theatre";
                    break;

                case "Entertainment: Television":
                    keyword = "Television";
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
                    keyword = "computers";
                    break;

                case "Science: Mathematics":
                    keyword = "1+1";
                    break;

                case "Mythology":
                    keyword = "Centauro";
                    break;

                case "Sports":
                    keyword = "baseball";
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
                    keyword = "dibujo";
                    break;

                case "Celebrities":
                    keyword = "Taylor Swift";
                    break;

                case "Animals":
                    keyword = "Cat";
                    break;

                case "Vehicles":
                    keyword = "car";
                    break;

                case "Entertainment: Comics":
                    keyword ="comic";
                    break;

                case "Science: Gadgets":
                    keyword = "bombilla";
                    break;

                case "Entertainment: Japanese Anime & Manga":
                    keyword = "anime";
                    break;

                case "Entertainment: Cartoon & Animations":
                    keyword = "bob esponja";
                    break;

                default:
                    keyword = "navidad";
            }
            
            
            console.log("Palabra clave para la imagen:", keyword);

            
            cargarAsy_img(keyword);
            break;
        }
    }
};

document.addEventListener("DOMContentLoaded", cargarAsy_question);


















// const option1 = document.getElementById("option1");
// const option2 = document.getElementById("option2");
// const option3 = document.getElementById("option3");
// const option4 = document.getElementById("option4");
// const img_container = document.getElementById("img_container");
// const submit = document.getElementById("submit");
// const question = document.getElementById("question");

// const ruta_trivia = "https://opentdb.com/api.php?&amount=5";
// // category=15

// const cargarAsy_img = async (keyword) => {
    // const ruta_img = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f803e8b71325d2d2c06ef563fd9e9f44&text=${keyword}&format=json&nojsoncallback=1&per_page=1`;

    // try {
        // const datos = await fetch(ruta_img);
        // const datosjson = await datos.json();

        // if (datosjson.photos.photo.length > 0) {
            // const photo = datosjson.photos.photo[0];
            // const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
            // const img = document.createElement("img");
            // img.src = photoUrl;
            // img.style.maxWidth = "100%";
            // img.style.height = "auto";
            // img_container.innerHTML = "";
            // img_container.appendChild(img);
        // } else {
            // console.log("No se encontraron fotos.");
        // }
    // } catch (error) {
        // console.error("Error al cargar la imagen:", error);
    // }
// };

// const cargarAsy_question = async () => {
    // const datos = await fetch(ruta_trivia);
    // let datosjson = await datos.json(); // convierte a JSON
    // console.log(datosjson);

    // const results = datosjson.results; // resultados
    // ShowAnswers(results);

    // for (const result of results) {
        // if (result.type === "multiple") {
            // ShowAnswers([result]);
            // return result;
        // }
    // }


// };


// const ShowAnswers = (results) => {
    // let keyword;
    // if (results.length > 0) {
        // results.forEach(result => {
            // const allAnswers = [...result.incorrect_answers];
            // allAnswers.push(result.correct_answer);
            // allAnswers.sort(() => Math.random() - 0.5);
            // question.innerHTML = result.question;
            // keyword = result.category;
            // console.log(keyword);

        // // document.getElementById("result").innerHTML = result.question ;

        // option1.innerHTML = allAnswers[0];
        // option2.innerHTML = allAnswers[1];
        // option3.innerHTML = allAnswers[2];
        // option4.innerHTML = allAnswers[3];
        
        // return results[0];
    // });
    // cargarAsy_img(keyword);
// }
// };


// document.addEventListener("DOMContentLoaded", cargarAsy_question);

// // 0:
// // category : "Entertainment: Video Games"
// // correct_answer : "October 31st, 2019"
// // difficulty : "easy"
// // incorrect_answers : (3) ['January 13th, 2019', 'September 6th, 2018', 'October 1st, 2019']
// // question : "When was &quot;Luigi&#039;s Mansion 3&quot; released?"
// // type : "multiple"