const EmployeeService = require("../../service/employeeService");

const EmployeeReadController = {
  findAll: (req, res) => {
    console.log("in /employee findall");
    EmployeeService.findAllEmployee(req, res)
      .then((response) => {
        console.log("fetch /employee findAll, successful");
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log("fetch /employee findAll, unsuccessul");
        res.status(400).json(err);
      });
  },

  findByCafeNameAndLocation: (req, res) => {
    console.log("in /employee cafeNameandLocation");
    EmployeeService.findEmployeeByCafeNameAndLocation(req, res)
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err));
  },

  findByCafeName: (req, res) => {
    console.log("in /employee cafeName");
    EmployeeService.findEmployeeByCafeName(req, res)
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err));
  },

  findByCafeLocation: (req, res) => {
    console.log("in /employee cafeLocation");
    EmployeeService.findEmployeeByCafeLocation(req, res)
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = EmployeeReadController;
