const db = require("../config/mysql");

const Employee = {
  findAll: () => {},
  findById: () => {},
  findByCafe: () => {},
  deleteById: () => {},
  create: () => {},
  update: () => {},
};

Employee.findAll = () => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM employee";
    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

Employee.findById = (id) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM employee WHERE id = '${id}'`;
    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

Employee.findByCafe = (cafe) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT employee.id, employee.name as 'Employee Name', employee.email_address, employee.phone_number, 
                    CASE
                      WHEN SUM(DATEDIFF(IFNULL(employee_cafe.date_end, CURDATE()), employee_cafe.date_start)) >= 0
                      THEN SUM(DATEDIFF(IFNULL(employee_cafe.date_end, CURDATE()), employee_cafe.date_start))
                      ELSE 0
                    END AS total_days_worked,
                    cafe.name as 'Cafe Name',
                    cafe.location
                  FROM employee
                  JOIN employee_cafe ON employee.id = employee_cafe.employee_id
                  JOIN cafe ON employee_cafe.cafe_id = cafe.id
                  WHERE cafe.name = '${cafe}'
                  GROUP BY employee.id, employee.name, employee.email_address, employee.phone_number, cafe.name, 
                  cafe.location
                  ORDER BY total_days_worked DESC;`;
    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

Employee.deleteById = (id) => {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM employee WHERE ID = '${id}'`;
    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

Employee.create = (employee) => {
  return new Promise((resolve, reject) => {
    let query = "INSERT INTO employee SET ?";
    db.query(query, employee, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

Employee.update = (employee) => {
  return new Promise((resolve, reject) => {
    let query = `UPDATE employee SET ? WHERE id = '${employee.id}'`;
    db.query(query, employee, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = Employee;
