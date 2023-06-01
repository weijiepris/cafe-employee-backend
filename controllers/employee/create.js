const _ = require("lodash");
const { generateUUID } = require("./utilities/uuid");
const { validateEmployee } = require("./utilities/validator");

const CafeService = require("../../service/cafeService");
const EmployeeService = require("../../service/employeeService");
const EmployeeCafeService = require("../../service/employeeCafeService");

const db = require("../../config/mysql");

const create = (req, res) => {
  console.log("accessing create in /employees ");

  // to start a transaction
  db.beginTransaction(async (err) => {
    if (err) {
      console.error("Error beginning transaction:", err);
      return res.status(400).json({
        message: "Error beginning transaction for creation of employee",
      });
    }

    let employee = req.body;
    if (!validateEmployee(employee)) {
      return res
        .status(400)
        .json({ message: "One or more information about Employee not found" });
    }
    employee.id = generateUUID();

    const { cafe, location } = employee;
    let cafeList = {};

    if (cafe || location) {
      if (!cafe || !location) {
        return res.status(400).json({
          message: `Please make sure that Cafe name and location is provided, please check again`,
        });
      }

      // find if cafe exists
      const cafeResult = await CafeService.findCafeByNameAndLocation(
        req,
        res,
        cafe,
        location
      )
        .then((response) => response)
        .catch((err) => {
          return false;
        });

      if (!cafeResult) {
        return res.status(400).json({
          message: `There are no cafe with the name '${cafe}' and location '${location}', please check again`,
        });
      }

      cafeList = cafeResult;
    }

    delete employee.cafe;
    delete employee.location;

    // create employee
    EmployeeService.createEmployee(employee)
      .then((response) => {
        console.log("employee created", response);
        // commit when cafe and location information not provided
        if (!cafe && !location) {
          db.commit();
          return res.status(200).json(employee);
        }
      })
      .catch((err) => {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ message: `Employee '${employee.name}' already exists` });
        }
        return res.status(400).json({ message: err.code });
      });

    if (cafe && location) {
      //if cafe & location provided, create into employee_cafe table
      if (cafeList.length === 0 || !cafeList[0] || !cafeList[0].id) {
        console.log("asdfasdf", cafeList);
        db.rollback(() => {
          console.error("Transaction rolled back.");
          return res.status(400).json({
            message: `Cafe '${cafe}' does not exist in location '${location}'`,
          });
        });
      } else {
        let employeeCafe = {
          employee_id: employee.id,
          cafe_id: cafeList[0].id,
          date_start: new Date(),
        };

        EmployeeCafeService.createEmployeeCafe(employeeCafe)
          .then(() => {
            console.log("employee_cafe created successfully");
            db.commit();
            return res.status(200).json(employee);
          })
          .catch((err) => {
            if (err.code === "ER_DUP_ENTRY") {
              return res.status(400).json({
                message: `Employee with ID '${employee.id}' already exists in Cafe '${cafeList[0].name}' in location '${cafeList[0].location}'. Not possible to be in more than 1 cafe`,
              });
            }
            return res.status(400).json(err);
          });
      }
    }
  });
};

module.exports = { create };
