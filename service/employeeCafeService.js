const EmployeeCafe = require("../models/employeeCafeModel");

const EmployeeCafeService = {
  createEmployeeCafe: (employeeCafe) => {
    return new Promise((resolve, reject) => {
      return EmployeeCafe.create(employeeCafe)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateEmployeeCafe: (employeeCafe) => {
    return new Promise((resolve, reject) => {

      if (employeeCafe.date_start && employeeCafe.date_start !== "") {
        employeeCafe.date_start = formatDate(employeeCafe.date_start)
      } else {
        employeeCafe.date_start = null;
      }

      if (employeeCafe.date_end && employeeCafe.date_end !== "") {
        employeeCafe.date_end = formatDate(employeeCafe.date_end)
      } else {
        employeeCafe.date_end = null;
      }

      return EmployeeCafe.update(employeeCafe)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      return EmployeeCafe.findById(id)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteById: (id) => {
    return EmployeeCafe.deleteById(id);
  },
};


const formatDate = (dateString) => {
  console.log("format", dateString)
  if (dateString instanceof Date) {
    let month = dateString.getMonth() + 1;
    let date = dateString.getDate();

    if (month < 10) month = "0" + month
    if (date < 10) date = "0" + date;


    return `${dateString.getFullYear()}-${month}-${date}`;
  }
  const dateParts = dateString.split('/');
  const year = dateParts[2];
  const month = dateParts[0];
  const day = dateParts[1];

  return `${year}-${month}-${day}`;
};
module.exports = EmployeeCafeService;