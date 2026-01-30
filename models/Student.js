const db = require('../config/db');

exports.getAll = cb => db.query('SELECT * FROM students', cb);

exports.getById = (id, cb) => db.query('SELECT * FROM students WHERE id = ?', [id], cb);

exports.create = (data, cb) => db.query('INSERT INTO students SET ?', data, cb);

exports.update = (id, data, cb) => db.query('UPDATE students SET ? WHERE id = ?', [data, id], cb);

exports.delete = (id, cb) => db.query('DELETE FROM students WHERE id = ?', [id], cb);

exports.count = (search, cb) => {
  db.query('SELECT COUNT(*) as total FROM students WHERE name LIKE ? OR email LIKE ?',
    [`%${search}%`, `%${search}%`], cb);
};

exports.paginated = (search, limit, offset, cb) => {
  db.query('SELECT * FROM students WHERE name LIKE ? OR email LIKE ? LIMIT ? OFFSET ?',
    [`%${search}%`, `%${search}%`, limit, offset], cb);
};