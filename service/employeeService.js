const Employee = require("../models/employeeModel");

const EmployeeService = {};

EmployeeService.findAllEmployee = () => {
  return Employee.findAll();
};

EmployeeService.findEmployeeById = (id) => {
  return Employee.findById(id);
};

EmployeeService.findEmployeeByCafe = (location) => {
  return Employee.findByCafe(location);
};

EmployeeService.createEmployee = (employee) => {
  return Employee.create(employee);
};

EmployeeService.updateEmployee = (employee) => {
  return Employee.update(employee);
};

EmployeeService.deleteEmployeeById = (id) => {
  return Employee.deleteById(id);
};

module.exports = EmployeeService;
