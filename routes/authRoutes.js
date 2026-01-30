const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');
const { body } = require('express-validator');

const multerHandler = (field) => (req, res, next) => {
  upload.single(field)(req, res, err => {
    if (err) { req.flash('error', err.message); return res.redirect('/register'); }
    next();
  });
};

router.get('/', auth.loginPage);
router.post('/login', auth.login);
router.get('/register', auth.registerPage);
router.post('/register', multerHandler('profile_image'), [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], auth.register);
router.get('/logout', auth.logout);

module.exports = router;
