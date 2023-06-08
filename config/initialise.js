const initialiseDatabase = (db) => {
  db.query("CREATE DATABASE IF NOT EXISTS cafedb", (err, results) => {
    if (err) {
      console.log("Error checking if database exists:", err);
    } else {
      db.query("USE cafedb", (err) => {
        if (err) {
          console.log("Error selecting database:", err);
        } else {
          createEmployeeTable(db);
        }
      });
    }
  });
};

function createEmployeeTable(db) {
  db.query(
    `CREATE TABLE IF NOT EXISTS employee (
            id VARCHAR(9) NOT NULL COMMENT 'unique employee identifier',
            name VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'given name',
            email_address VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'email address',
            phone_number INT(8) NOT NULL COMMENT 'Phone/Contact number',
            gender VARCHAR(1) COMMENT 'Gender (M - Male, F - Female)',
            PRIMARY KEY (id)
          )`,
    () => {
      createCafeTable(db);
    }
  );
}

function createCafeTable(db) {
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
    () => {
      createEmployeeCafeTable(db);
    }
  );
}

function createEmployeeCafeTable(db) {
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
    () => {}
  );
}

module.exports = initialiseDatabase;
