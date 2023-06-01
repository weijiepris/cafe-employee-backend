const EmployeeService = require("../../service/employeeService");

const EmployeCreateController = { create: () => {} };

EmployeCreateController.create = (req, res) => {
  EmployeeService.createEmployee(req, res)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports = EmployeCreateController;
