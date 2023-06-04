const db = require("../config/mysql");

const EmployeeCafe = {
  create: (employeeCafe) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO employee_cafe (employee_id, cafe_id, date_start) VALUES ('${employeeCafe.employee_id}', '${employeeCafe.cafe_id}', '${formatDate(employeeCafe.date_start)}');`;
      db.query(query, (error, result) => {
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

const formatDate = (dateString) => {
  const dateParts = dateString.split('/');
  const year = dateParts[2];
  const month = dateParts[0];
  const day = dateParts[1];

  return `${year}-${month}-${day}`;
};

module.exports = EmployeeCafe;