const db = require("./config/mysql");
const initialiseApp = require("./app.js");
const CafeService = require("./service/cafeService");
const validator = require("./service/utilities/validator");
const cafeModel = require("./models/cafeModel");
const EmployeeCafeService = require("./service/employeeCafeService");
const employeeCafeModel = require("./models/employeeCafeModel");
const EmployeeService = require("./service/employeeService");
const employeeModel = require("./models/employeeModel");
require("dotenv").config();
const port = process.env.SECRET_PORT;

const cafeService = new CafeService(validator, cafeModel, db);
const employeeCafeService = new EmployeeCafeService(employeeCafeModel);
const employeeService = new EmployeeService(
    employeeModel,
    db,
    validator,
    cafeService,
    employeeCafeService
);

const app = initialiseApp(db, cafeService, employeeService);

app.listen(port, () => {
    console.log(`App running on port ${port} on production server \n`);
});
