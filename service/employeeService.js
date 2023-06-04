const Employee = require("../models/employeeModel");
const db = require("../config/mysql");
const {
  validateEmployeeWithId,
  validateEmployee,
} = require("./utilities/validator");
const CafeService = require("./cafeService");
const EmployeeCafeService = require("./employeeCafeService");
const { generateEmployeeUUID } = require("./utilities/uuid");

const EmployeeService = {
  findAllEmployee: (req, res) => {
    return new Promise((resolve, reject) => {
      const cafe = req.query.cafe;

      if (cafe) {
        return EmployeeService.findEmployeeByCafe(req, res)
          .then((response) => resolve(response))
          .catch((err) => reject(err));
      }

      return Employee.findAll()
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },

  findEmployeeByCafe: (req, res) => {
    return new Promise((resolve, reject) => {
      const cafeName = req.query.cafe;

      return Employee.findByCafe(cafeName)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },

  findEmployeeByCafeNameAndLocation: (req, res) => {
    return new Promise((resolve, reject) => {
      const cafeName = req.params.name;
      const location = req.params.location;

      return Employee.findCafeByNameAndLocation(cafeName, location)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },

  findEmployeeByCafeName: (req, res) => {
    return new Promise((resolve, reject) => {
      const cafeName = req.params.name;

      return Employee.findByCafe(cafeName)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },

  findEmployeeByCafeLocation: (req, res) => {
    return new Promise((resolve, reject) => {
      const location = req.params.location;

      return Employee.findCafeByLocation(location)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },

  findEmployeeById: (id) => {
    return Employee.findById(id);
  },

  createEmployee: (req, res) => {
    return new Promise((resolve, reject) => {
      db.beginTransaction(async (dbErr) => {
        if (dbErr) {
          reject("Error beginning transaction:", dbErr);
        }

        let employee = req.body;
        console.log("creating employee", employee)
        const date_start = employee.date_start;
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

        delete employee.cafe;
        delete employee.location;
        delete employee.date_start;

        Employee.create(employee)
          .then(() => {
            if (!cafe && !location) {
              db.commit();
              console.log("employee created", employee)
              resolve(employee);
            }
          })
          .catch((err) => {
            if (err.code === "ER_DUP_ENTRY") {
              return res.status(400).json({
                message: `Employee '${employee.name}' already exists`,
              });
            }
            return res.status(400).json({ message: err.code });
          });

        if (cafe && location) {
          if (cafeExists.length === 0) {
            db.rollback(() => {
              console.error("Transaction rolled back.");
              reject(`Cafe '${cafe}' does not exist in location '${location}'`);
            });
          }

          let employeeCafe = {
            employee_id: employee.id,
            cafe_id: cafeExists[0].id,
            date_start: date_start,
          };

          console.log("creating employeeCafe", employeeCafe)
          EmployeeCafeService.createEmployeeCafe(employeeCafe)
            .then(() => {
              db.commit();
              resolve(employeeCafe);
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
  },

  updateEmployee: (req, res) => {
    return new Promise(async (resolve, reject) => {
      let employee = req.body;
      console.log("updating employeeing")
      const date_start = employee.date_start;
      const date_end = employee.date_end;
      db.beginTransaction(async (dbErr) => {
        if (dbErr) {
          reject("Error beginning transaction:", err);
        }

        if (!validateEmployeeWithId(employee)) {
          reject("One or more information about Employee not found");
        }
        const { id: employeId, cafe, location } = employee;
        const employeeExists = await EmployeeService.findEmployeeById(
          employeId
        );

        if (employeeExists.length === 0) {
          reject(`Employee with id '${employeId}' does not exist`);
        }

        if (!cafe && !location) {
          delete employee.cafe;
          delete employee.location;
          delete employee.date_start;
          delete employee.date_end;

          return Employee.update(employee)
            .then(() => {
              db.commit();
              resolve(employee);
            })
            .catch((err) => {
              reject(err);
            });
        }

        if (cafe || location) {
          if (!cafe || !location) {
            reject(
              `Please make sure that Cafe name and location is provided, please check again`
            );
          }

          const cafeExists = await CafeService.findCafeByNameAndLocation(
            cafe,
            location
          ).then((response) => response);

          if (cafeExists.length === 0) {
            reject(`Cafe '${cafe}' in '${location}' does not exist`);
            return;
          }

          const employeeCafe = {
            employee_id: employeeExists[0].id,
            cafe_id: cafeExists[0].id,
            date_start,
            date_end
          };

          if (!employeeCafe.date_end) {
            delete employeeCafe.date_end
          }

          const employeeCafeExists = await EmployeeCafeService.findById(
            employeeCafe.employee_id
          );

          if (employeeCafeExists.length === 0) {
            employeeCafe.date_start = new Date();
            EmployeeCafeService.createEmployeeCafe(employeeCafe)
              .then(() => {
                db.commit();
                resolve(employee);
                console.log("CREATed NEW RECORD")
                return;
              })
              .catch((err) => {
                console.log("ERR NEW RECORD")
                if (err.code === "ER_DUP_ENTRY") {
                  reject(
                    `Employee with ID '${employee.id}' already exists in Cafe '${cafeExists[0].name}' in location '${cafeExists[0].location}'. Not possible to be in more than 1 cafe`
                  );
                }
                reject(err);
              });
          }

          console.log("updating", employeeCafe)
          EmployeeCafeService.updateEmployeeCafe(employeeCafe)
            .then(() => { })
            .catch((err) => {
              reject(err);
            });

          delete employee.cafe;
          delete employee.location;
          delete employee.date_start;
          delete employee.date_end;
          Employee.update(employee)
            .then(() => {
              db.commit();
              resolve(employee);
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    });
  },

  deleteEmployeeById: (req, res) => {
    return new Promise(async (resolve, reject) => {
      const id = req.params.id;

      const employee = await EmployeeService.findEmployeeById(id);

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
  },
};

module.exports = EmployeeService;
