const EmployeeCafe = require("../models/employeeCafeModel");

const createEmployeeCafe = (employeeCafe) => {
  return EmployeeCafe.create(employeeCafe);
};

module.exports = { createEmployeeCafe };
