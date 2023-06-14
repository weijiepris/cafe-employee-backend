const EmployeeCreateController = (employeeService) => ({
  create: (req, res) => {
    employeeService.createEmployee(req, res)
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err));
  },
});

module.exports = EmployeeCreateController;
