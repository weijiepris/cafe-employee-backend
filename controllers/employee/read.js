const EmployeeService = require("../../service/employeeService");

const EmployeeReadController = { findAll: () => {} };

EmployeeReadController.findAll = (req, res) => {
  EmployeeService.findAllEmployee(req, res)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports = EmployeeReadController;
