require("dotenv").config();

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});



connection.connect((error) => {
  if (error) {
    console.error("Connection Error: ", error);
    return;
  }
  console.log(process.env.DATABASE + " MYSQL Connected...");
});

module.exports = connection;
