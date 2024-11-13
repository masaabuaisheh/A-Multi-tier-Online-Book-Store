require("dotenv").config();


const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST1,
  user: process.env.DATABASE_USER1,
  password: process.env.DATABASE_PASSWORD1,
  database: process.env.DATABASE1,
});


connection.connect((error) => {
  if (error) {
    console.error("Connection Error: ", error);
    return;
  }
  console.log(process.env.DATABASE1);
  console.log(process.env.DATABASE1 + " MYSQL Connected2...");
});

module.exports = connection;
