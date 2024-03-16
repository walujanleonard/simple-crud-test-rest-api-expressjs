// initDB.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');

  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
    (err, result) => {
      if (err) throw err;
      console.log('Database created or already exists.');

      connection.changeUser({database: process.env.DB_NAME}, function (err) {
        if (err) throw err;

        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          country VARCHAR(255) NOT NULL
        )
      `;

        connection.query(createTableQuery, (err, result) => {
          if (err) throw err;
          console.log('Table created or already exists.');

          const insertDataQuery = `
          INSERT IGNORE INTO users (id, name, country) VALUES
          (1, 'Leo', 'Indonesia'),
          (2, 'Kevin', 'Singapore'),
          (3, 'Fatih', 'Indonesia'),
          (4, 'Evan', 'Australia'),
          (5, 'Charlie', 'Germany')
        `;

          connection.query(insertDataQuery, (err, result) => {
            if (err) throw err;
            console.log('Sample data inserted or already exists.');
            connection.end();
          });
        });
      });
    },
  );
});
