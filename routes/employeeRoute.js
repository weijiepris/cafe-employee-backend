const express = require("express");
const router = express.Router();

const EmployeeReadController = require("../controllers/employee/read");
const EmployeeDeleteController = require("../controllers/employee/delete");
const EmployeeUpdateController = require("../controllers/employee/update");
const EmployeeCreateController = require("../controllers/employee/create");
const EmployeeService = require("../service/employeeService");

const validator = require("../service/utilities/validator");
const employeeModel = require("../models/employeeModel");
const db = require("../config/mysql");
const CafeService = require("../service/cafeService");
const EmployeeCafeService = require("../service/employeeCafeService");
const cafeModel = require("../models/cafeModel");
const employeeCafeModel = require("../models/employeeCafeModel");

// dependency injection

const cafeService = new CafeService(validator, cafeModel, db);
const employeeCafeService = new EmployeeCafeService(employeeCafeModel);
const employeeService = new EmployeeService(
  employeeModel,
  db,
  validator,
  cafeService,
  employeeCafeService
);
const employeeReadController = EmployeeReadController(employeeService);
const employeeDeleteController = EmployeeDeleteController(employeeService);
const employeeUpdateController = EmployeeUpdateController(employeeService);
const employeeCreateController = EmployeeCreateController(employeeService);

router.get("/", employeeReadController.findAll);
router.get(
  "/cafe/:name/location/:location",
  employeeReadController.findByCafeNameAndLocation
);
router.get("/cafe/:name", employeeReadController.findByCafeName);
router.get("/location/:location", employeeReadController.findByCafeLocation);
router.post("/", employeeCreateController.create);
router.put("/", employeeUpdateController.update);
router.delete("/:id", employeeDeleteController.deleteById);

module.exports = router;
