const db = require("../config/mysql");

const EmployeeCafe = {
  create: (employeeCafe) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO employee_cafe SET ?";
      db.query(query, employeeCafe, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  update: (employeeCafe) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE employee_cafe SET ? WHERE employee_id = '${employeeCafe.employee_id}'`;
      db.query(query, employeeCafe, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM employee_cafe WHERE employee_id = '${id}'`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
};

module.exports = EmployeeCafe;