const EmployeeService = require("../../service/employeeService");

const EmployeeUpdateController = {
  update: (req, res) => {
    EmployeeService.updateEmployee(req, res)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
};

module.exports = EmployeeUpdateController;