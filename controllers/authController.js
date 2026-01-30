const bcrypt = require('bcrypt');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.loginPage = (req, res) => res.render('auth/login');
exports.registerPage = (req, res) => res.render('auth/register');

exports.register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', errors.array()[0].msg);
    return res.redirect('/register');
  }

  const hashed = bcrypt.hashSync(req.body.password, 10);

  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashed,
    role: 'user',
    profile_image: req.file ? req.file.filename : null
  }, err => {
    if (err) {
      req.flash('error', 'Email already exists');
      return res.redirect('/register');
    }
    req.flash('success', 'Registered successfully');
    res.redirect('/');
  });
};

exports.login = (req, res) => {
  User.findByEmail(req.body.email, (err, result) => {
    if (!result || result.length === 0) {
      req.flash('error', 'User not found');
      return res.redirect('/');
    }
    const user = result[0];
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      req.flash('error', 'Invalid password');
      return res.redirect('/');
    }
    req.session.user = user;
    res.redirect('/students');
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};