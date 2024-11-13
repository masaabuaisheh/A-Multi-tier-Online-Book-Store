require("dotenv").config();

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST2,
  user: process.env.DATABASE_USER2,
  password: process.env.DATABASE_PASSWORD2,
  database: process.env.DATABASE2,
});

connection.connect((error) => {
  if (error) {
    console.error("Connection Error: ", error);
    return;
  }
  console.log(process.env.DATABASE2);
  console.log(process.env.DATABASE2 + " MYSQL Connected4...");
});

module.exports = connection;
