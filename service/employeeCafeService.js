const EmployeeCafe = require("../models/employeeCafeModel");

const EmployeeCafeService = {};

EmployeeCafeService.createEmployeeCafe = (employeeCafe) => {
  return new Promise((resolve, reject) => {
    return EmployeeCafe.create(employeeCafe)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

EmployeeCafeService.updateEmployeeCafe = (employeeCafe) => {
  return new Promise((resolve, reject) => {
    return EmployeeCafe.update(employeeCafe)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

EmployeeCafeService.findById = (id) => {
  return new Promise((resolve, reject) => {
    return EmployeeCafe.findById(id)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

EmployeeCafeService.deleteById = (id) => {
  return EmployeeCafe.deleteById(id);
};

module.exports = EmployeeCafeService;
