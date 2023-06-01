const EmployeeService = require("../../service/employeeService");

const findAll = (req, res) => {
  console.log("accessing findAll in /employees ");
  const value = req.query.cafe;
  if (!value) {
    EmployeeService.findAllEmployee()
      .then((response) => {
        const employeeList = response;
        return res.status(200).json(employeeList);
      })
      .catch((err) => {
        return res.status(400).json({
          message: err,
          response: [],
        });
      });
  } else {
    console.log("req query cafe: ", value);
    findAllByCafe(req, res, value);
  }
};

const findAllByCafe = (req, res, value) => {
  console.log("accessing findAllByCafe from findAll() in /employees ");
  EmployeeService.findEmployeeByCafe(value)
    .then((response) => {
      const employeeList = response;
      return res.status(200).json(employeeList);
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
        response: [],
      });
    });
};

module.exports = { findAll };
