const db = require("../config/mysql");

const Employee = {};

Employee.findAll = () => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM employee";
    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

Employee.findById = (id) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM employee WHERE ID = " + id;
    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = Employee;
