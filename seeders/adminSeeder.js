const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (callback) => {
  User.findByEmail(process.env.ADMIN_EMAIL, (e, r) => {
    if (r.length) { console.log('Admin exists'); return callback && callback(); }

    User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
      role: 'admin'
    }, () => {
      console.log('Admin seeded');
      callback && callback();
    });
  });
};
