require('dotenv').config();
const db = require('./config/db');
const seedAdmin = require('./seeders/adminSeeder');

seedAdmin(() => { db.end(); process.exit(0); });
