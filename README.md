# Node CRUD Application

A simple Node.js CRUD application with MySQL, featuring user authentication and student management.

---

## 🚀 Setup Instructions

Follow the steps below to run the project locally.

---

# 1️⃣ Update Dependencies

Make sure all npm packages are up to date:

```bash
npm update
```

# 2️⃣ Create Database

Create a new MySQL database named:

```sql
CREATE DATABASE node_crud;
```
Then select it:

```sql
USE node_crud;
```
# 3️⃣ Create Tables

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  profile_image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### Students Table (Linked to Users)
```sql
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  age INT,
  profile_image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_students_users FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE 
);
```
### Performance Indexes (Search & Pagination)
```sql
CREATE INDEX idx_students_name ON students(name);
def CREATE INDEX idx_students_email ON students(email);
def CREATE INDEX idx_students_user ON students(user_id);
```

# 4️⃣ Seed the Database 
run the seed script to insert initial data:

```bash
npm run seed
```

# 5️⃣ Start the Application 
starrt the development server:

```bash
npm start
```

# vist the application in your browser:
http://localhost:3000