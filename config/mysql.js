const mysql = require("mysql2");

// Create a connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass123",
});

// Check if the database exists
const initialiseTables = () => {
  db.query(
    "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'cafedb'",
    (err, results) => {
      if (err) {
        console.log("Error checking if database exists:", err);
      } else {
        if (results.length === 0) {
          // Database does not exist, create it
          db.query("CREATE DATABASE cafedb", (err) => {
            if (err) {
              console.log("Error creating database:", err);
            } else {
              createEmployeeTable();
            }
          });
        } else {
          createEmployeeTable();
        }
      }
    }
  );
};

// Function to create the employee table
function createEmployeeTable() {
  // Connect to the cafedb database
  db.query("USE cafedb", (err) => {
    if (err) {
      console.log("Error selecting database:", err);
    } else {
      // Create the employee table if it doesn't exist
      db.query(
        `CREATE TABLE IF NOT EXISTS employee (
          id VARCHAR(9) NOT NULL COMMENT 'unique employee identifier',
          name VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'given name',
          email_address VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'email address',
          phone_number INT(8) NOT NULL COMMENT 'Phone/Contact number',
          gender VARCHAR(1) COMMENT 'Gender (M - Male, F - Female)',
          PRIMARY KEY (id)
        )`,
        (err) => {
          if (err) {
            console.log("Error creating employee table:", err);
            createCafeTable();
          } else {
            createCafeTable();
          }
        }
      );
    }
  });
}

// Function to create the cafe table
function createCafeTable() {
  // Connect to the cafedb database
  db.query("USE cafedb", (err) => {
    if (err) {
      console.log("Error selecting database:", err);
    } else {
      // Create the cafe table if it doesn't exist
      db.query(
        `CREATE TABLE IF NOT EXISTS cafe (
          id VARCHAR(36) NOT NULL,
          name VARCHAR(255) NOT NULL COMMENT 'name of cafe',
          description VARCHAR(255) NOT NULL COMMENT 'description of cafe',
          logo MEDIUMBLOB,
          location VARCHAR(255) NOT NULL COMMENT 'location of cafe',
          PRIMARY KEY (id),
          UNIQUE KEY cafe_unique_id (name, location)
        )`,
        (err) => {
          if (err) {
            console.log("Error creating cafe table:", err);
            createEmployeeCafeTable();
          } else {
            createEmployeeCafeTable();
          }
        }
      );
    }
  });
}

// Function to create the employee_cafe table
function createEmployeeCafeTable() {
  // Connect to the cafedb database
  db.query("USE cafedb", (err) => {
    if (err) {
      console.log("Error selecting database:", err);
    } else {
      // Create the employee_cafe table if it doesn't exist
      db.query(
        `CREATE TABLE IF NOT EXISTS employee_cafe (
          employee_id VARCHAR(9) NOT NULL,
          cafe_id VARCHAR(36) NOT NULL,
          date_start DATE,
          date_end DATE,
          PRIMARY KEY (employee_id),
          FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
          FOREIGN KEY (cafe_id) REFERENCES cafe(id) ON DELETE CASCADE
        )`,
        (err) => {
          if (err) {
            console.log("Error creating employee_cafe table:", err);
          } else {
          }
        }
      );
    }
  });
}

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
      initialiseTables();
    }
  });
}

attemptConnection();

module.exports = db;
