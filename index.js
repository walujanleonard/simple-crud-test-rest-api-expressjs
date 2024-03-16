const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`
  <h1>Test CRUD Sederhana</h1>
  <a href="/users">Klik disini untuk melihat data users</a>
  `);
});

app.post('/users', (req, res) => {
  const {name, country} = req.body;

  if (!name || !country) {
    return res.status(400).send('Name and country are required');
  }

  const query = 'INSERT INTO users (name, country) VALUES (?, ?)';
  connection.query(query, [name, country], (err, result) => {
    if (err) throw err;
    res.send('User added successfully');
  });
});

app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.put('/users/:id', (req, res) => {
  const {name, country} = req.body;
  const {id} = req.params;

  if (!name || !country) {
    return res.status(400).send('Name and country are required');
  }

  const query = 'UPDATE users SET name = ?, country = ? WHERE id = ?';
  connection.query(query, [name, country, id], (err, result) => {
    if (err) throw err;
    res.send('User updated successfully');
  });
});

app.delete('/users/:id', (req, res) => {
  const {id} = req.params;

  if (!id) {
    return res.status(400).send('ID is required');
  }

  const query = 'DELETE FROM users WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send('User deleted successfully');
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
