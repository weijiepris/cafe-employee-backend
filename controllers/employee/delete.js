const EmployeeService = require("../../service/employeeService");

const EmployeeDeleteController = { deleteById: () => {} };

EmployeeDeleteController.deleteById = (req, res) => {
  return EmployeeService.deleteEmployeeById(req, res)
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((err) => {
      return res.status(400).json(err.message);
    });
};

module.exports = EmployeeDeleteController;
