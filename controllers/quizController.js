const Quiz = require("../models/quiz");

const renderHomepage = function (req, res) {
    const permission_level = req.session.user.permission;
    res.render('home', {permission: permission_level});
}

const createQuiz_get = function (req, res) {
    res.render('createquiz')
};

const createQuiz_post = async (req, res) => {
    const newQuiz = new Quiz({
        title: req.body.title,
        questions: [{
            question: req.body.question,
            answers: [{
                answer_option: req.body.answer
            }]
        }]
    });
    newQuiz.save()
        .then(() => res.redirect('/quizmanager/quizzes'))
        .catch(err => res.status(400).json('error: ' + err))
};

const viewAllQuizzes = async (req, res, next) => {
    Quiz.find()
        .populate('questions')
        .exec(function (err, quizzes) {
            if (err) return next(err)
            res.render('quizzes', { all_quizzes: quizzes })
        });
}

const viewQuiz = function (req, res, next) {
    const permission_level = req.session.user.permission;
    Quiz.findById(req.params.id)
        .exec(function (err, quiz) {
            if (err) return next(err)
            res.render('quiz', { quiz: quiz, permission: permission_level });
        });
}

const deleteQuiz_get = function (req, res, next) {
    Quiz.findById(req.params.id)
    .exec(function (err, quiz) {
        if (err) return next(err)
        res.render('delete', { quiz: quiz });
    });
}

const deleteQuiz_post = function (req, res, next) {
    Quiz.findOneAndRemove({
        '_id' : req.params.id
    },
        function (err, quiz) {
            if (err) return next(err)
            res.redirect('/quizmanager/quizzes')
        }
    )
}

const addQuestion_get = function (req, res) {
    Quiz.findById(req.params.id)
    .exec(function (err, quiz) {
        if (err) return next(err)
        res.render('addquestion', { quiz: quiz });
    });
}

const addQuestion_post = function (req, res, next) {
    Quiz.findOneAndUpdate({ '_id': req.params.id }, {
        '$push': {
            questions: {
                question: req.body.question
            }
        }
    },
        function (err, quiz) {
            res.redirect('/quizmanager/quiz/' + req.params.id)
        });
}

const editQuestion_get = function (req, res, next) {
    Quiz.findOne({'_id': req.params.id})
    .exec(function (err, quiz) {
        if (err) return next(err)
        res.render('editquestion', { quiz: quiz, question_id: req.params.otherid });
    });
}

const editQuestion_post = function (req, res, next) {
    Quiz.findOneAndUpdate({
        '_id': req.params.id, 'questions._id': req.params.otherid
    },
        {
            '$set': {
                'questions.$.question': req.body.question
            }
        },
        function (err, quiz) {
            if (err) return next(err)
            res.redirect('/quizmanager/quiz/' + req.params.id)
        }
    )
}

const deleteQuestion_get = function (req, res, next) {
    Quiz.findById(req.params.id)
    .populate('questions')
    .exec(function (err, quiz) {
        if (err) return next(err)
        res.render('delete', { quiz: quiz });
    });
}

const deleteQuestion_post = function (req, res, next) {
    Quiz.findOneAndUpdate({
        '_id': req.params.id
    },
        {
            '$pull': {
                'questions': {'_id': req.params.otherid}
            }
        },
        function (err, quiz) {
            if (err) return next(err)
            res.redirect('/quizmanager/quiz/' + req.params.id)
        }
    )
}

const viewAnswers = function (req, res, next) {
    const permission_level = req.session.user.permission;
    Quiz.findOne({
        '_id': req.params.id})
    .exec(function (err, quiz) {
        if (err) return next(err)
        const letters = ['A.', 'B.', 'C.', 'D.', 'E.'];
        res.render('answers', { quiz: quiz, question_id: req.params.otherid, letters: letters, permission: permission_level });
    });
}

const addAnswer_post = function (req, res, next) {
    Quiz.findOneAndUpdate({ '_id': req.params.id, 'questions._id': req.params.otherid}, {
        '$push': {
            'questions.$.answers': {
                'answer_option': req.body.answer
            }
    }
},
        function (err, quiz) {
            console.log(quiz)
            res.redirect('/quizmanager/quiz/'+quiz._id)
        });
}

const addAnswer_get = function (req, res) {
    Quiz.findById(req.params.id)
    .exec(function (err, quiz) {
        if (err) return next(err)
        res.render('addanswer', {quiz: quiz});
    });
}

const deleteAnswer_get = function(req, res, next) {
    Quiz.findById(req.params.id)
    .exec(function (err, quiz) {
        if (err) return next(err)
        res.render('delete', {quiz: quiz, question_id: req.params.otherid});
    });
}

const deleteAnswer_post = function(req, res, next) {
    Quiz.findOneAndUpdate({
        '_id': req.params.id, 'questions._id': req.params.otherid
    },
    {
        '$pull': {
            'questions.$.answers': {
                    '_id': req.params.answerid
                }
        }
    },
    function (err, quiz) {
        if (err) return next(err)
        res.redirect('/quizmanager/quizzes')
    });
}

const editAnswer_get = function(req, res, next) {
    Quiz.findOne({'_id': req.params.id})
    .exec(function (err, quiz) {
        if (err) return next(err)
        res.render('editanswer', { quiz: quiz, question_id: req.params.otherid, answer_id: req.params.answerid });
    });
}

const editAnswer_post = function(req, res, next) {
    Quiz.findOneAndUpdate({
        '_id': req.params.id, 'questions._id': req.params.otherid
    },
    {
        '$set': {
            'questions.$.answers.$[i].answer_option': req.body.answer
                
        }
    }, {
        arrayFilters: [{
            'i._id': req.params.answerid
        }]
    },
    function (err, quiz) {
        if (err) return next(err)
        res.redirect('/quizmanager/quiz/'+quiz._id)
    });
}


module.exports = {
    renderHomepage,
    createQuiz_post,
    createQuiz_get,
    viewQuiz,
    viewAllQuizzes,
    addQuestion_post,
    addQuestion_get,
    editQuestion_get,
    editQuestion_post,
    deleteQuestion_post,
    deleteQuestion_get,
    deleteQuiz_post,
    deleteQuiz_get,
    viewAnswers,
    addAnswer_get,
    addAnswer_post,
    deleteAnswer_get,
    deleteAnswer_post,
    editAnswer_get,
    editAnswer_post
}