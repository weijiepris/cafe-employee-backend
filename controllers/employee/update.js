const _ = require("lodash");
const { validateEmployeeWithId } = require("./utilities/validator");
const EmployeeService = require("../../service/employeeService");
const CafeService = require("../../service/cafeService");
const db = require("../../config/mysql");
const EmployeeCafeService = require("../../service/employeeCafeService");

const update = async (req, res) => {
  console.log("accessing update in /employees ");

  let employee = req.body;
  db.beginTransaction(async (err) => {
    if (!validateEmployeeWithId(employee)) {
      return res
        .status(400)
        .json({ message: "One or more information about Employee not found" });
    }

    const { id } = employee;

    const employeeExists = await EmployeeService.findEmployeeById(id).then(
      (response) => response
    );

    if (employeeExists.length === 0) {
      return res
        .status(400)
        .json({ message: `Employee with id '${id}' does not exist` });
    } else {
      const { cafe, location } = employee;
      if (cafe || location) {
        if (!cafe || !location) {
          return res.status(400).json({
            message: `Please make sure that Cafe name and location is provided, please check again`,
          });
        }

        const cafeExists = await CafeService.findCafeByNameAndLocation(
          req,
          res,
          cafe,
          location
        ).then((response) => response);

        if (cafeExists.length === 0) {
          return res.status(400).json({
            message: `Cafe '${cafe}' in '${location}' does not exist`,
          });
        } else {
          const employeeCafe = {
            employee_id: employeeExists[0].id,
            cafe_id: cafeExists[0].id,
          };

          EmployeeCafeService.updateEmployeeCafe(employeeCafe)
            .then((response) => {
              console.log(response);
              db.commit();
              return res
                .status(200)
                .json({ message: `updated`, cafe: cafeExists });
            })
            .catch((err) => {
              return res.status(400).json({ message: `not implemented`, err });
            });
        }
      }

      if (!employee.cafe && !employee.location) {
        EmployeeService.updateEmployee(employee).then((response) => {
          return res.status(200).json(employee);
        });
      }
    }
  });
};

module.exports = { update };
