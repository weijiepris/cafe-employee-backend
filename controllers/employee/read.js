const EmployeeReadController = (employeeService) => ({
  findAll: (req, res) => {
    employeeService
      .findAllEmployee(req, res)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  findByCafeNameAndLocation: (req, res) => {
    employeeService
      .findEmployeeByCafeNameAndLocation(req, res)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => res.status(400).json(err));
  },

  findByCafeName: (req, res) => {
    employeeService
      .findEmployeeByCafeName(req, res)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => res.status(400).json(err));
  },

  findByCafeLocation: (req, res) => {
    employeeService
      .findEmployeeByCafeLocation(req, res)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => res.status(400).json(err));
  },
});

module.exports = EmployeeReadController;
