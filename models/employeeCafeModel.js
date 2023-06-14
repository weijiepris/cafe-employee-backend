const db = require("../config/mysql");

const EmployeeCafe = {
  create: (employeeCafe) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO employee_cafe (employee_id, cafe_id, date_start, date_end) VALUES ('${
        employeeCafe.employee_id
      }', '${employeeCafe.cafe_id}', ${formatDate(
        employeeCafe.date_start
      )}, ${formatDate(employeeCafe.date_end)});`;

      db.query(query, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  },

  update: (employeeCafe) => {
    return new Promise((resolve, reject) => {
      const { employee_id, cafe_id, date_start, date_end } = employeeCafe;

      const query = `UPDATE employee_cafe SET employee_id = '${employee_id}', cafe_id = '${cafe_id}', date_start = ${formatDate(
        date_start
      )}, date_end = ${formatDate(date_end)} WHERE employee_id = '${
        employeeCafe.employee_id
      }'`;

      db.query(query, employeeCafe, (error, result) => {
        if (error) {
          reject(error);
          return;
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
  if (!dateString) return null;

  if (dateString instanceof Date) {
    let month = dateString.getMonth() + 1;
    let date = dateString.getDate();

    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;

    return `'${dateString.getFullYear()}-${month}-${date}'`;
  }

  const dateParts = dateString.split("/");
  const year = dateParts[2];
  const month = dateParts[0];
  const day = dateParts[1];

  return `'${year}-${month}-${day}'`;
};

module.exports = EmployeeCafe;
