const _ = require("lodash");
const { generateUUID } = require("./utilities/uuid");
const { validateEmployee } = require("./utilities/validator");
const { createEmployee } = require("../../service/employeeService");
const {
  findCafeByName,
  findCafeByNameAndLocation,
} = require("../../service/cafeService");
const { createEmployeeCafe } = require("../../service/employeeCafeService");

const create = async (req, res) => {
  console.log("accessing create in /employees ");

  let employee = req.body;
  if (!validateEmployee(employee)) {
    res
      .status(400)
      .json({ message: "One or more information about Employee not found" });
    return;
  }
  employee.id = generateUUID();

  const { cafe, location } = employee;
  let cafeList = {};

  if (cafe || location) {
    if (!cafe || !location) {
      res.status(400).json({
        message: `Please make sure that Cafe anme and location is provided, please check again`,
      });
      return;
    }

    const cafeResult = await findCafeByNameAndLocation(req, res, cafe, location)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return false;
      });

    if (!cafeResult) {
      res.status(400).json({
        message: `There are no cafe with the name '${cafe}' and location '${location}', please check again`,
      });
      return;
    }

    cafeList = cafeResult;
  }

  delete employee.cafe;
  delete employee.location;

  createEmployee(employee)
    .then(() => {
      res.status(200).json(employee);
    })
    .catch((err) => {

      if(err.code === "ER_DUP_ENTRY"){
        res.status(400).json({ message: `Employee '${employee.name}' already exists`  });
        return
      }

      res.status(400).json({ message: err.code });
      return;
    });

  if (cafe && location) {
    let employeeCafe = {
      employee_id: employee.id,
      cafe_id: cafeList[0].id,
      date_start: new Date(),
    };

    createEmployeeCafe(employeeCafe)
      .then(() => {
        console.log("employee_cafe created successfully");
      })
      .catch((err) => {
        console.log("employee_cafe failed to create");
      });
  }
};

module.exports = { create };
