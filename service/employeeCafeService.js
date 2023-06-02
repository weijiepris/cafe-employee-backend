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

module.exports = EmployeeCafeService;