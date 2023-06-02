const db = require("../config/mysql");

const Employee = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT e.*, c.name AS 'cafe_name', c.location,
                      CASE
                        WHEN DATEDIFF(NOW(), ec.date_start) < 0 THEN 0
                        ELSE DATEDIFF(NOW(), ec.date_start)
                      END AS days_worked
                    FROM employee e
                    LEFT JOIN employee_cafe ec ON e.id = ec.employee_id
                    LEFT JOIN cafe c ON c.id = ec.cafe_id;`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM employee WHERE id = '${id}'`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  findByCafe: (cafe) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT employee.*,
                      CASE
                        WHEN SUM(DATEDIFF(IFNULL(employee_cafe.date_end, CURDATE()), employee_cafe.date_start)) >= 0
                        THEN SUM(DATEDIFF(IFNULL(employee_cafe.date_end, CURDATE()), employee_cafe.date_start))
                        ELSE 0
                      END AS days_worked,
                      cafe.name as 'cafe_name',
                      cafe.location
                    FROM employee
                    JOIN employee_cafe ON employee.id = employee_cafe.employee_id
                    JOIN cafe ON employee_cafe.cafe_id = cafe.id
                    WHERE cafe.name = '${cafe}'
                    GROUP BY employee.id, employee.name, employee.email_address, employee.phone_number, cafe_name, 
                    cafe.location
                    ORDER BY days_worked DESC;`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  findCafeByNameAndLocation: (cafeName, location) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT e.*, c.name AS 'cafe_name', c.location,
                      CASE
                        WHEN DATEDIFF(NOW(), ec.date_start) < 0 THEN 0
                        ELSE DATEDIFF(NOW(), ec.date_start)
                      END AS days_worked
                    FROM employee e
                    LEFT JOIN employee_cafe ec ON e.id = ec.employee_id
                    LEFT JOIN cafe c ON c.id = ec.cafe_id
                    WHERE LOWER(c.name) = LOWER('${cafeName}')
                    AND LOWER(c.location) = LOWER('${location}');`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  findCafeByLocation: (location) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT e.*, c.name AS 'cafe_name', c.location,
                      CASE
                        WHEN DATEDIFF(NOW(), ec.date_start) < 0 THEN 0
                        ELSE DATEDIFF(NOW(), ec.date_start)
                      END AS days_worked
                    FROM employee e
                    LEFT JOIN employee_cafe ec ON e.id = ec.employee_id
                    LEFT JOIN cafe c ON c.id = ec.cafe_id
                    WHERE LOWER(c.location) = LOWER('${location}');`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM employee WHERE ID = '${id}'`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  create: (employee) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO employee SET ?";
      db.query(query, employee, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  update: (employee) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE employee SET ? WHERE id = '${employee.id}'`;
      db.query(query, employee, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
};

module.exports = Employee;