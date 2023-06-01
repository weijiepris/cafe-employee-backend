const EmployeeService = require("../../service/employeeService");

const EmployeeUpdateController = { update: () => {} };

EmployeeUpdateController.update = async (req, res) => {
  EmployeeService.updateEmployee(req, res)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports = EmployeeUpdateController;
