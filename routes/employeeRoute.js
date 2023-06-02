const express = require("express");
const router = express.Router();

const EmployeeReadController = require("../controllers/employee/read");
const EmployeeDeleteController = require("../controllers/employee/delete");
const EmployeeUpdateController = require("../controllers/employee/update");
const EmployeCreateController = require("../controllers/employee/create");

router.get("/", EmployeeReadController.findAll);
router.get("/cafe/:name/location/:location", EmployeeReadController.findByCafeNameAndLocation);
router.get("/cafe/:name", EmployeeReadController.findByCafeName);
router.get("/location/:location", EmployeeReadController.findByCafeLocation);
router.post("/", EmployeCreateController.create);
router.put("/", EmployeeUpdateController.update);
router.delete("/:id", EmployeeDeleteController.deleteById);

module.exports = router;
