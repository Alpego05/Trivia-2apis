//Objeto para las preguntas

class question{
    constructor(question,category,difficulty,incorrect_answers,correct_answer){
        this.question = question;
        this.category = category;
        this.difficulty = difficulty;
        this.incorrect_answers = [];
        this.correct_answer = correct_answer;
        
    }
}

const newQuestion = (jsonData) =>{

}



//ejemplo
// // 0:
// // category : "Entertainment: Video Games"
// // correct_answer : "October 31st, 2019"
// // difficulty : "easy"
// // incorrect_answers : (3) ['January 13th, 2019', 'September 6th, 2018', 'October 1st, 2019']
// // question : "When was &quot;Luigi&#039;s Mansion 3&quot; released?"
// // type : "multiple"