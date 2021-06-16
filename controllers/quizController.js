const Quiz = require("../models/quiz");

exports.renderHomepage = function (req, res) {
    const permission_level = req.session.user.permission;
    res.render('home', {permission: permission_level});
}

exports.createQuiz_get = function (req, res) {
    res.render('createquiz')
};

exports.createQuiz_post = async (req, res) => {
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

exports.viewAllQuizzes = async (req, res, next) => {
    const permission_level = req.session.user.permission;
    Quiz.find()
        .populate('questions')
        .exec(function (err, quizzes) {
            if (err) return next(err)
            res.render('quizzes', { all_quizzes: quizzes, permission: permission_level })
        });
}

exports.viewQuiz = function (req, res, next) {
    const permission_level = req.session.user.permission;
    Quiz.findById(req.params.id)
        .exec(function (err, quiz) {
            if (err) return next(err)
            res.render('quiz', { quiz: quiz, permission: permission_level });
        });
}

exports.deleteQuiz_get = function (req, res, next) {
    Quiz.findById(req.params.id)
    .exec(function (err, quiz) {
        if (err) return next(err)
        res.render('delete', { quiz: quiz });
    });
}

exports.deleteQuiz_post = function (req, res, next) {
    Quiz.findOneAndRemove({
        '_id' : req.params.id
    },
        function (err, quiz) {
            if (err) return next(err)
            res.redirect('/quizmanager/quizzes')
        }
    )
}

exports.addQuestion_get = function (req, res) {
    Quiz.findById(req.params.id)
    .exec(function (err, quiz) {
        if (err) return next(err)
        res.render('addquestion', { quiz: quiz });
    });
}

exports.addQuestion_post = function (req, res, next) {
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

exports.editQuestion_get = function (req, res, next) {
    Quiz.findOne({'_id': req.params.id})
    .exec(function (err, quiz) {
        if (err) return next(err)
        res.render('editquestion', { quiz: quiz, question_id: req.params.otherid });
    });
}

exports.editQuestion_post = function (req, res, next) {
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

exports.deleteQuestion_get = function (req, res, next) {
    Quiz.findById(req.params.id)
    .populate('questions')
    .exec(function (err, quiz) {
        if (err) return next(err)
        res.render('delete', { quiz: quiz });
    });
}

exports.deleteQuestion_post = function (req, res, next) {
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

exports.viewAnswers = function (req, res, next) {
    const permission_level = req.session.user.permission;
    Quiz.findOne({
        '_id': req.params.id})
    .exec(function (err, quiz) {
        if (err) return next(err)
        const letters = ['A.', 'B.', 'C.', 'D.', 'E.'];
        res.render('answers', { quiz: quiz, question_id: req.params.otherid, letters: letters, permission: permission_level });
    });
}

exports.addAnswer_post = function (req, res, next) {
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

exports.addAnswer_get = function (req, res) {
    Quiz.findById(req.params.id)
    .exec(function (err, quiz) {
        if (err) return next(err)
        res.render('addanswer', {quiz: quiz});
    });
}

exports.deleteAnswer_get = function(req, res, next) {
    Quiz.findById(req.params.id)
    .exec(function (err, quiz) {
        if (err) return next(err)
        res.render('delete', {quiz: quiz, question_id: req.params.otherid});
    });
}

exports.deleteAnswer_post = function(req, res, next) {
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

exports.editAnswer_get = function(req, res, next) {
    Quiz.findOne({'_id': req.params.id})
    .exec(function (err, quiz) {
        if (err) return next(err)
        res.render('editanswer', { quiz: quiz, question_id: req.params.otherid, answer_id: req.params.answerid });
    });
}

exports.editAnswer_post = function(req, res, next) {
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