const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    answer_option: String
});

const questionSchema = new mongoose.Schema({
    question: String,
    answers: [answerSchema]
});

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema]
});

quizSchema
.virtual('url')
.get(function() {
    return '/quizmanager/quiz/' + this._id
});

questionSchema
.virtual('url')
.get(function() {
    return this._id
});


const Quiz = mongoose.model('Quiz', quizSchema);
const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);
 
module.exports = Quiz, Question, Answer;