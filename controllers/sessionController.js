exports.checkAuthenticated = function (req, res, next) {
    if (!req.session.user) {
      return res.redirect('/quizmanager/signin');
    }
    return next();
};

exports.checkLoggedIn = function (req, res, next) {
    if (req.session.user) {
      return res.redirect('/quizmanager/');
    }
    return next();
};

exports.logout = function (req, res) {
    req.session.destroy();
    return res.redirect('/quizmanager/signin')
};

exports.restrictedAccess = function (req, res, next) {
  if (req.session.user.permission === 'restricted') {
    return res.render('restricted');
  }
  return next();
}