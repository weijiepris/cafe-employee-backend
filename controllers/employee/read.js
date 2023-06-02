const EmployeeService = require("../../service/employeeService");

const EmployeeReadController = {
  findAll: (req, res) => {
    EmployeeService.findAllEmployee(req, res)
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err));
  },
  
  findByCafeNameAndLocation: (req, res) => {
    EmployeeService.findEmployeeByCafeNameAndLocation(req, res)
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err));
  },
  
  findByCafeName: (req, res) => {
    EmployeeService.findEmployeeByCafeName(req, res)
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err));
  },
  
  findByCafeLocation: (req, res) => {
    EmployeeService.findEmployeeByCafeLocation(req, res)
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = EmployeeReadController;