const { generateEmployeeUUID } = require("./utilities/uuid");

class EmployeeService {
  constructor(employeeModel, db, validator, cafeService, employeeCafeService) {
    this.Employee = employeeModel;
    this.db = db;
    this.validator = validator;
    this.CafeService = cafeService;
    this.EmployeeCafeService = employeeCafeService;
  }

  findAllEmployee(req, res) {
    return new Promise((resolve, reject) => {
      const cafe = req.query.cafe;

      if (cafe) {
        return this.findEmployeeByCafe(req, res)
          .then((response) => resolve(response))
          .catch((err) => reject(err));
      }

      return this.Employee.findAll()
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  findEmployeeByCafe(req, res) {
    const cafeName = req.query.cafe;

    return this.Employee.findByCafe(cafeName);
  }

  findEmployeeByCafeNameAndLocation(req, res) {
    const cafeName = req.params.name;
    const location = req.params.location;

    return this.Employee.findCafeByNameAndLocation(cafeName, location);
  }

  findEmployeeByCafeName(req, res) {
    const cafeName = req.params.name;

    return this.Employee.findByCafe(cafeName);
  }

  findEmployeeByCafeLocation(req, res) {
    const location = req.params.location;

    return this.Employee.findCafeByLocation(location);
  }

  findEmployeeById(id) {
    return this.Employee.findById(id);
  }

  createEmployee(req, res) {
    return new Promise((resolve, reject) => {
      this.db.beginTransaction(async (dbErr) => {
        if (dbErr) {
          reject("Error beginning transaction:", dbErr);
        }

        let employee = req.body;

        if (!this.validator.validateEmployee(employee)) {
          reject("One or more information about Employee not found");
        }

        this.validator.transformDate(employee);
        const date_start = employee.date_start;

        employee.id = generateEmployeeUUID();
        const { cafe, location } = employee;
        let cafeExists;
        if (cafe || location) {
          if (!cafe || !location) {
            reject(
              `Please make sure that Cafe name and location is provided, please check again`
            );
          }

          cafeExists = await this.CafeService.findCafeByNameAndLocation(
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
        delete employee.date_end;

        this.Employee.create(employee)
          .then(() => {
            if (!cafe && !location) {
              this.db.commit();
              resolve(employee);
            }
          })
          .catch((err) => {
            if (err.code === "ER_DUP_ENTRY") {
              reject(`Employee '${employee.name}' already exists`);
            }
          });

        if (cafe && location) {
          if (cafeExists.length === 0) {
            this.db.rollback(() => {
              console.error("Transaction rolled back.");
              reject(`Cafe '${cafe}' does not exist in location '${location}'`);
            });
          }

          let employeeCafe = {
            employee_id: employee.id,
            cafe_id: cafeExists[0].id,
            date_start: date_start,
          };
          this.EmployeeCafeService.createEmployeeCafe(employeeCafe)
            .then(() => {
              this.db.commit();
              resolve(employeeCafe);
            })
            .catch((err) => {
              if (err.code === "ER_DUP_ENTRY") {
                this.db.rollback(() => {
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
  }

  updateEmployee(req, res) {
    return new Promise(async (resolve, reject) => {
      let employee = req.body;
      const date_start = employee.date_start;
      const date_end = employee.date_end;
      this.db.beginTransaction(async (dbErr) => {
        if (dbErr) {
          reject("Error beginning transaction:", err);
        }

        if (!this.validator.validateEmployeeWithId(employee)) {
          reject("One or more information about Employee not found");
        }

        this.validator.transformDate2(employee);

        const { id: employeId, cafe, location } = employee;
        const employeeExists = await this.findEmployeeById(employeId);

        if (employeeExists.length === 0) {
          reject(`Employee with id '${employeId}' does not exist`);
        }

        if (!cafe && !location) {
          delete employee.cafe;
          delete employee.location;
          delete employee.date_start;
          delete employee.date_end;

          return this.Employee.update(employee)
            .then(() => {
              this.db.commit();
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

          const cafeExists = await this.CafeService.findCafeByNameAndLocation(
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
            date_end,
          };

          if (!employeeCafe.date_end) {
            delete employeeCafe.date_end;
          }

          const employeeCafeExists = await this.EmployeeCafeService.findById(
            employeeCafe.employee_id
          );

          if (employeeCafeExists.length === 0) {
            if (!employeeCafe.date_start) {
              employeeCafe.date_start = new Date();
            }

            this.EmployeeCafeService.createEmployeeCafe(employeeCafe)
              .then(() => {
                this.db.commit();
                resolve(employee);
                return;
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

          this.EmployeeCafeService.updateEmployeeCafe(employeeCafe)
            .then(() => {})
            .catch((err) => {
              reject(err);
            });

          delete employee.cafe;
          delete employee.location;
          delete employee.date_start;
          delete employee.date_end;
          this.Employee.update(employee)
            .then(() => {
              this.db.commit();
              resolve(employee);
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    });
  }

  deleteEmployeeById(req, res) {
    return new Promise(async (resolve, reject) => {
      const id = req.params.id;

      const employee = await this.findEmployeeById(id);

      if (employee.length === 0) {
        reject({ message: `Employee with id '${id}' does not exist` });
      }

      this.Employee.deleteById(id)
        .then((response) => {
          resolve({ message: "Employee deleted", response });
        })
        .catch((err) => {
          reject({ message: `Unable to delete employee ${err}` });
        });
    });
  }
}

module.exports = EmployeeService;
