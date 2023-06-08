const mysql = require("mysql2");
const initialiseTables = require("./initialise");
const initialiseDatabase = require("./initialise");

// Create a connection
const db = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "pass123",
});

// Connect to the database
let retries = 0;
function attemptConnection() {
  db.connect((err) => {
    if (err) {
      console.error("MySQL connection error:", err);
      if (retries < 2) {
        retries++;
        console.log(`Retrying connection (attempt ${retries})...`);
        setTimeout(attemptConnection, 2000); // Retry after 2 seconds
      } else {
        console.error("Maximum number of connection retries exceeded.");
      }
    } else {
      console.log("MySQL connection has been established successfully");
      initialiseDatabase(db);
    }
  });
}

attemptConnection();

module.exports = db;
