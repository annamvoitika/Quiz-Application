var express = require('express');
var router = express.Router();
const quizController = require('../controllers/quizController');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

/* GET users listing. */
router.get('/', sessionController.checkAuthenticated, quizController.renderHomepage);

router.get('/register', sessionController.checkLoggedIn, userController.register_get);
router.post('/register', sessionController.checkLoggedIn, userController.register_post);
router.get('/signin', sessionController.checkLoggedIn, userController.user_signin_get);
router.post('/signin', sessionController.checkLoggedIn, userController.user_signin_post);
router.get('/logout', sessionController.checkAuthenticated, sessionController.logout);


router.get('/createquiz', sessionController.checkAuthenticated, sessionController.restrictedAccess, quizController.createQuiz_get)
router.post('/createquiz', sessionController.checkAuthenticated, sessionController.restrictedAccess, quizController.createQuiz_post)
router.get('/quizzes', sessionController.checkAuthenticated, quizController.viewAllQuizzes);
router.get('/quiz/:id', sessionController.checkAuthenticated, quizController.viewQuiz);
router.get('/quiz/:id/addquestion', quizController.addQuestion_get);
router.post('/quiz/:id/addquestion', quizController.addQuestion_post);
router.get('/quiz/:id/editquestion/:otherid', quizController.editQuestion_get);
router.post('/quiz/:id/editquestion/:otherid', quizController.editQuestion_post);
router.get('/quiz/:id/deletequestion/:otherid', quizController.deleteQuestion_get);
router.post('/quiz/:id/deletequestion/:otherid', quizController.deleteQuestion_post);
router.get('/quiz/:id/deletequiz', quizController.deleteQuiz_get);
router.post('/quiz/:id/deletequiz', quizController.deleteQuiz_post);
router.get('/quiz/:id/answers/:otherid', sessionController.checkAuthenticated, sessionController.restrictedAccess, quizController.viewAnswers);
router.get('/quiz/:id/answers/:otherid/addanswer', quizController.addAnswer_get);
router.post('/quiz/:id/answers/:otherid/addanswer', quizController.addAnswer_post);
router.get('/quiz/:id/answers/:otherid/deleteanswer/:answerid', quizController.deleteAnswer_get);
router.post('/quiz/:id/answers/:otherid/deleteanswer/:answerid', quizController.deleteAnswer_post);
router.get('/quiz/:id/answers/:otherid/editanswer/:answerid', quizController.editAnswer_get);
router.post('/quiz/:id/answers/:otherid/editanswer/:answerid', quizController.editAnswer_post);



module.exports = router;
