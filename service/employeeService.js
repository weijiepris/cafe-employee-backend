const Employee = require("../models/employeeModel");
const db = require("../config/mysql");
const {
  validateEmployeeWithId,
  validateEmployee,
} = require("./utilities/validator");
const CafeService = require("./cafeService");
const EmployeeCafeService = require("./employeeCafeService");
const { generateEmployeeUUID } = require("./utilities/uuid");

const EmployeeService = {};

EmployeeService.findAllEmployee = (req, res) => {
  return new Promise((resolve, reject) => {
    const cafe = req.query.cafe;

    // if valid cafe params is provided
    if (cafe) {
      return EmployeeService.findEmployeeByCafe(req, res)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    }

    // no valid cafe params provided, will retrieve all employees
    return Employee.findAll()
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

EmployeeService.findEmployeeByCafe = (req, res) => {
  return new Promise((resolve, reject) => {
    const cafeName = req.query.cafe;

    return Employee.findByCafe(cafeName)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

EmployeeService.findEmployeeById = (id) => {
  return Employee.findById(id);
};

EmployeeService.createEmployee = (req, res) => {
  return new Promise((resolve, reject) => {
    // to start a transaction
    db.beginTransaction(async (dbErr) => {
      if (dbErr) {
        reject("Error beginning transaction:", dbErr);
      }

      let employee = req.body;
      if (!validateEmployee(employee)) {
        reject("One or more information about Employee not found");
      }
      employee.id = generateEmployeeUUID();
      const { cafe, location } = employee;
      let cafeExists;
      if (cafe || location) {
        if (!cafe || !location) {
          reject(
            `Please make sure that Cafe name and location is provided, please check again`
          );
        }
        // find if cafe exists
        cafeExists = await CafeService.findCafeByNameAndLocation(
          cafe,
          location
        );

        if (cafeExists.length === 0) {
          reject(
            `There are no cafe with the name '${cafe}' and location '${location}', please check again`
          );
          return;
        }
      }

      // remove cafe and location properties
      delete employee.cafe;
      delete employee.location;

      // create employee
      Employee.create(employee)
        .then(() => {
          // commit when cafe and location information not provided, this is to end the transaction early
          if (!cafe && !location) {
            db.commit();
            resolve(employee);
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

      // when cafe and location properties are provided
      if (cafe && location) {
        // guard
        if (cafeExists.length === 0) {
          db.rollback(() => {
            console.error("Transaction rolled back.");
            reject(`Cafe '${cafe}' does not exist in location '${location}'`);
          });
        }

        let employeeCafe = {
          employee_id: employee.id,
          cafe_id: cafeExists[0].id,
          date_start: new Date(),
        };
        EmployeeCafeService.createEmployeeCafe(employeeCafe)
          .then(() => {
            console.log("employee_cafe created successfully");
            db.commit();
            resolve(employee);
          })
          .catch((err) => {
            if (err.code === "ER_DUP_ENTRY") {
              db.rollback(() => {
                console.error("Transaction rolled back.");
                reject(
                  `Employee with ID '${employee.id}' already exists in Cafe '${cafeExists[0].name}' in location '${cafeList[0].location}'. Not possible to be in more than 1 cafe`
                );
              });
            }
            return reject(err);
          });
      }
    });
  });
};

/**
 * 1. employee must exist in employee table
 * 2. employee must exist in employee table, cafe and location provided must exist in cafe table
 *      > if no records found in employee_cafe, create one
 *      > if have records, update record
 * @param {*} req
 * @param {*} res
 */
EmployeeService.updateEmployee = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let employee = req.body;

    db.beginTransaction(async (dbErr) => {
      if (dbErr) {
        reject("Error beginning transaction:", err);
      }

      // validate employee object
      if (!validateEmployeeWithId(employee)) {
        reject("One or more information about Employee not found");
      }
      const { id: employeId, cafe, location } = employee;
      const employeeExists = await EmployeeService.findEmployeeById(employeId);

      if (employeeExists.length === 0) {
        reject(`Employee with id '${employeId}' does not exist`);
      }

      // normal update as cafe and location params not provided
      if (!cafe && !location) {
        return Employee.update(employee)
          .then(() => {
            db.commit();
            resolve(employee);
          })
          .catch((err) => {
            reject(err);
          });
      }

      // cafe and location properties provided in body
      if (cafe || location) {
        // check if both properties are valid
        if (!cafe || !location) {
          reject(
            `Please make sure that Cafe name and location is provided, please check again`
          );
        }

        // check if cafe exist
        const cafeExists = await CafeService.findCafeByNameAndLocation(
          cafe,
          location
        ).then((response) => response);

        if (cafeExists.length === 0) {
          reject(`Cafe '${cafe}' in '${location}' does not exist`);
          return;
        }
        // build employeeCafe object
        const employeeCafe = {
          employee_id: employeeExists[0].id,
          cafe_id: cafeExists[0].id,
        };

        // check if record exists in employee_cafe, create one if does not exist
        const employeeCafeExists = await EmployeeCafeService.findById(
          employeeCafe.employee_id
        );

        // records does not exists, create one
        if (employeeCafeExists.length === 0) {
          // build onto employeeCafe object
          employeeCafe.date_start = new Date();

          EmployeeCafeService.createEmployeeCafe(employeeCafe)
            .then(() => {
              console.log("employee_cafe created successfully");
              db.commit();
              resolve(employee);
            })
            .catch((err) => {
              if (err.code === "ER_DUP_ENTRY") {
                reject(
                  `Employee with ID '${employee.id}' already exists in Cafe '${cafeExists[0].name}' in location '${cafeExists[0].location}'. Not possible to be in more than 1 cafe`
                );
              }
              reject(err);
            });
        }

        EmployeeCafeService.updateEmployeeCafe(employeeCafe)
          .then(() => {
            db.commit();
            resolve(cafeExists);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });
};

EmployeeService.deleteEmployeeById = (req, res) => {
  return new Promise(async (resolve, reject) => {
    const id = req.body.id;

    // check if employee exists
    const employee = await EmployeeService.findEmployeeById(id);

    // employee not found
    if (employee.length === 0) {
      reject({ message: `Employee with id '${id}' does not exist` });
    }

    Employee.deleteById(id)
      .then((response) => {
        resolve({ message: "Employee deleted", response });
      })
      .catch((err) => {
        reject({ message: `Unable to delete employee ${err}` });
      });
  });
};

module.exports = EmployeeService;
