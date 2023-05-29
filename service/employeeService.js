const db = require("../config/mysql");
const Employee = require("../models/employeeModel");

const findAllEmployee = async () => {
  const employeeList = await Employee.findAll();
  return employeeList;
};

const findEmployeeById = async (id) => {
  const employee = await Employee.findById(id);
  return employee;
};

module.exports = { findAllEmployee, findEmployeeById };
