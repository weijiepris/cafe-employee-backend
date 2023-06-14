const EmployeeDeleteController = (employeeService) => ({
  deleteById: (req, res) => {
    employeeService.deleteEmployeeById(req, res)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  },
});

module.exports = EmployeeDeleteController;
