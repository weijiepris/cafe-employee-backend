const express = require("express");
const router = express.Router();

const EmployeeReadController = require("../controllers/employee/read");
const EmployeeDeleteController = require("../controllers/employee/delete");
const EmployeeUpdateController = require("../controllers/employee/update");
const EmployeeCreateController = require("../controllers/employee/create");

const employeeRoutes = (db, employeeService) => {
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

    return router;
}


module.exports = employeeRoutes;
