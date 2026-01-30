exports.isAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    req.flash('error', 'Please login first');
    return res.redirect('/');
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    req.flash('error', 'Access denied');
    return res.redirect('/students');
  }
  next();
};