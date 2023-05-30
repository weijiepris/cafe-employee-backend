const Employee = require("../models/employeeModel");

const findAllEmployee = () => {
  return Employee.findAll();
};

const findEmployeeById = (id) => {
  return Employee.findById(id);
};

const deleteEmployeeById = (id) => {
  return Employee.deleteById(id);
};

module.exports = { findAllEmployee, findEmployeeById, deleteEmployeeById };
