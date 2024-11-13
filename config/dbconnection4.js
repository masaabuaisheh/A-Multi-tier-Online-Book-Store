require("dotenv").config();

<<<<<<< HEAD
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST2,
  user: process.env.DATABASE_USER2,
  password: process.env.DATABASE_PASSWORD2,
  database: process.env.DATABASE2,
});

=======

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST3,
  user: process.env.DATABASE_USER3,
  password: process.env.DATABASE_PASSWORD3,
  database: process.env.DATABASE3,
});


>>>>>>> testing-docker
connection.connect((error) => {
  if (error) {
    console.error("Connection Error: ", error);
    return;
  }
<<<<<<< HEAD
  console.log(process.env.DATABASE2);
  console.log(process.env.DATABASE2 + " MYSQL Connected4...");
=======
  console.log(process.env.DATABASE3);
  console.log(process.env.DATABASE3 + " MYSQL Connected4...");
>>>>>>> testing-docker
});

module.exports = connection;
