const Student = require('../models/Student');
const fs = require('fs');
const path = require('path');

exports.index = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || '';
  const limit = 5;
  const offset = (page - 1) * limit;

  Student.count(search, (e, count) => {
    Student.paginated(search, limit, offset, (err, students) => {
      const totalPages = Math.max(1, Math.ceil(count[0].total / limit));
      res.render('students/index', { students, user: req.session.user, search, currentPage: page, totalPages });
    });
  });
};

exports.create = (req, res) => {
  const data = {
    user_id: req.session.user.id,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    profile_image: req.file ? req.file.filename : null
  };

  Student.create(data, () => {
    req.flash('success', 'Student added');
    res.redirect('/students');
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Student.getById(id, (err, r) => {
    if (!r.length) { req.flash('error', 'Student not found'); return res.redirect('/students'); }

    const oldImage = r[0].profile_image;
    const data = { name: req.body.name, email: req.body.email, age: req.body.age };

    if (req.file) {
      data.profile_image = req.file.filename;
      if (oldImage) { const oldPath = path.join(__dirname, '../public/uploads', oldImage); if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath); }
    }

    Student.update(id, data, () => { req.flash('success', 'Student updated'); res.redirect('/students'); });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Student.getById(id, (err, r) => {
    if (!r.length) { req.flash('error', 'Student not found'); return res.redirect('/students'); }
    if (r[0].profile_image) { const p = path.join(__dirname, '../public/uploads', r[0].profile_image); if (fs.existsSync(p)) fs.unlinkSync(p); }
    Student.delete(id, () => { req.flash('success', 'Student deleted'); res.redirect('/students'); });
  });
};