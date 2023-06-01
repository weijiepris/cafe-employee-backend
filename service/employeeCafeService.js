const EmployeeCafe = require("../models/employeeCafeModel");

const EmployeeCafeService = {};

EmployeeCafeService.createEmployeeCafe = (employeeCafe) => {
  return EmployeeCafe.create(employeeCafe);
};

EmployeeCafeService.updateEmployeeCafe = (employeeCafe) => {
  return EmployeeCafe.update(employeeCafe);
};

module.exports = EmployeeCafeService;
