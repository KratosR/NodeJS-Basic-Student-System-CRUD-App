const express = require('express');
const router = express.Router();
const student = require('../controllers/studentController');
const upload = require('../middleware/uploadMiddleware');
const { isAuth, isAdmin } = require('../middleware/authMiddleware');

const multerHandler = (field) => (req, res, next) => {
  upload.single(field)(req, res, err => {
    if (err) { req.flash('error', err.message); return res.redirect('/students'); }
    next();
  });
};

router.get('/', isAuth, student.index);
router.post('/add', isAuth, isAdmin, multerHandler('profile_image'), student.create);
router.post('/update/:id', isAuth, isAdmin, multerHandler('profile_image'), student.update);
router.get('/delete/:id', isAuth, isAdmin, student.delete);

module.exports = router;
