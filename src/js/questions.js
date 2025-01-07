//Objeto para las preguntas

class Question{
    constructor(question,category,difficulty,incorrect_answers,type,correct_answer){
        this.question = question;
        this.category = category;
        this.difficulty = difficulty;
        this.incorrect_answers = [];
        this.type = type;
        this.correct_answer = correct_answer;
        
    }
}

//metodo para crear el objeto pregunta que viene desde script.js
const newQuestion = (jsonData) => {
    // Crear una instancia de la clase Question
    const newquestion = new Question(
        jsonData.question,
        jsonData.category,
        jsonData.difficulty,
        jsonData.incorrect_answers,
        jsonData.type,
        jsonData.correct_answer
    );

    console.log(newquestion); // mostrar 
    return newquestion; // devolver 
};


//ejemplo
// // 0:
// // category : "Entertainment: Video Games"
// // correct_answer : "October 31st, 2019"
// // difficulty : "easy"
// // incorrect_answers : (3) ['January 13th, 2019', 'September 6th, 2018', 'October 1st, 2019']
// // question : "When was &quot;Luigi&#039;s Mansion 3&quot; released?"
// // type : "multiple"