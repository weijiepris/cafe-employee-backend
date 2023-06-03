const mysql = require("mysql2");

// Create a connection
const db = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "pass123",
  database: "cafedb",
});

db.connect((err) => {
  if (err) {
    console.log("MySQL connection has failed, ", err);
  } else {
    console.log("MySQL connection has been initialised successfully");
  }
});

module.exports = db;
