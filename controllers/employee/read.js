const { findAllEmployee, findEmployeeByLocation } = require("../../service/employeeService");

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
    findAllByLocation(req, res, value);
  }
};

const findAllByLocation = (req, res, value) => {
  console.log("accessing findAllByCafe in /employees ");
  findEmployeeByLocation(value)
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
// const findById = (req, res) => {
//   const id = req.params.id;
//   findEmployeeById(id)
//     .then((response) => {
//       const employee = response;
//       if (employee.length === 0) {
//         return res
//           .status(200)
//           .json({ message: "no records found", response: employee });
//       }
//       return res
//         .status(200)
//         .json({ message: "employee found", response: employee });
//     })
//     .catch((err) => {
//       return res.status(400).json({ message: err, response: [] });
//     });
// };

const findByCafe = (req, res) => {};

module.exports = { findAll, findByCafe };
