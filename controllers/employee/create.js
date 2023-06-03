const EmployeeService = require("../../service/employeeService");

const EmployeeCreateController = {
  create: (req, res) => {
    console.log("in /employee create")
    EmployeeService.createEmployee(req, res)
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = EmployeeCreateController;
