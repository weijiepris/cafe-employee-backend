const db = require("../config/mysql");

const EmployeeCafe = { create: () => {}, update: () => {}, findById: () => {} };

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

EmployeeCafe.update = (employeeCafe) => {
  return new Promise((resolve, reject) => {
    let query = `UPDATE employee_cafe SET ? WHERE employee_id = '${employeeCafe.employee_id}'`;
    db.query(query, employeeCafe, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

EmployeeCafe.findById = (id) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM employee_cafe WHERE employee_id = '${id}'`;
    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = EmployeeCafe;
