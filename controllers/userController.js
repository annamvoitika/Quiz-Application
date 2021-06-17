const User = require('../models/user');

exports.register_get = function (req, res) {
    res.render('registration');
}

exports.register_post = function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        permission: req.body.permission
    });
    user.save()
        .then(() => res.redirect('/quizmanager/signin'))
        .catch(err => res.status(400).json('error: ' + err))
}

exports.user_signin_get = function (req, res, next) {
    res.render('signin');
}

exports.user_signin_post = function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return res.redirect('/quizmanager/signin');
        }
        if (!user) {
            return res.redirect('/quizmanager/register');
        }
        user.comparePassword(password, function (err, isMatch) {
            if (isMatch && isMatch == true) {
                req.session.user = user;
                res.redirect('/quizmanager');
            }
            else { res.render('signin') }
        })
    })
}
