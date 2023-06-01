const Employee = require("../models/employeeModel");

const findAllEmployee = () => {
  return Employee.findAll();
};

const findEmployeeById = (id) => {
  return Employee.findById(id);
};

const findEmployeeByCafe = (location) => {
  return Employee.findByCafe(location);
};

const createEmployee = (employee) => {
  return Employee.create(employee);
}

const deleteEmployeeById = (id) => {
  return Employee.deleteById(id);
};

module.exports = { findAllEmployee, findEmployeeById, deleteEmployeeById, createEmployee, findEmployeeByCafe };