require("dotenv").config();


const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST3,
  user: process.env.DATABASE_USER3,
  password: process.env.DATABASE_PASSWORD3,
  database: process.env.DATABASE3,
});


connection.connect((error) => {
  if (error) {
    console.error("Connection Error: ", error);
    return;
  }
  console.log(process.env.DATABASE3);
  console.log(process.env.DATABASE3 + " MYSQL Connected4...");
});

module.exports = connection;
