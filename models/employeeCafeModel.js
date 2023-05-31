const db = require("../config/mysql");

const EmployeeCafe = {};

EmployeeCafe.create = (employeeCafe) => {
  return new Promise((resolve, reject) => {
    let query = "INSERT INTO employee_cafe SET ?";
    db.query(query, employeeCafe, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = EmployeeCafe;
