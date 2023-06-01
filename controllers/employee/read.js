const {
  findAllEmployee,
  findEmployeeByCafe,
} = require("../../service/employeeService");

const findAll = (req, res) => {
  console.log("accessing findAll in /employees ");
  const value = req.query.cafe;
  if (!value) {
    findAllEmployee()
      .then((response) => {
        const employeeList = response;
        return res.status(200).json({
          message: "employee found",
          response: employeeList,
          records: employeeList.length,
        });
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
  findEmployeeByCafe(value)
    .then((response) => {
      const employeeList = response;
      return res.status(200).json({
        message: "employee found",
        response: employeeList,
        records: employeeList.length,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
        response: [],
      });
    });
};

module.exports = { findAll };
