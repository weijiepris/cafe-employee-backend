const EmployeeService = require("../../service/employeeService");

const EmployeeDeleteController = {
  deleteById: (req, res) => {
    EmployeeService.deleteEmployeeById(req, res)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  },
};

module.exports = EmployeeDeleteController;
