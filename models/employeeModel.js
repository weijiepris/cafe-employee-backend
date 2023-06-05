const db = require("../config/mysql");

const Employee = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT e.*, c.name AS 'cafe_name', c.location,
                      CASE
                        WHEN ec.date_end IS NULL THEN DATEDIFF(NOW(), ec.date_start)
                        ELSE DATEDIFF(ec.date_end, ec.date_start)
                      END AS days_worked,
                      ec.date_start, ec.date_end
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
      const query = `SELECT e.*,
      CASE
        WHEN ec.date_end IS NULL THEN DATEDIFF(NOW(), ec.date_start)
        ELSE DATEDIFF(ec.date_end, ec.date_start)
      END AS days_worked,
      c.name AS 'cafe_name',
      c.location,
      ec.date_start,
      ec.date_end
    FROM employee e
    JOIN employee_cafe ec ON e.id = ec.employee_id
    JOIN cafe c ON ec.cafe_id = c.id
    WHERE c.name = '${cafe}'
    GROUP BY e.id, e.name, e.email_address, e.phone_number, cafe_name, c.location, ec.date_start, ec.date_end
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
      const query = `SELECT e.*,
                      CASE
                        WHEN ec.date_end IS NULL THEN DATEDIFF(NOW(), ec.date_start)
                        ELSE DATEDIFF(ec.date_end, ec.date_start)
                      END AS days_worked,
                      c.name AS 'cafe_name',
                      c.location,
                      ec.date_start,
                      ec.date_end
                    FROM employee e
                    JOIN employee_cafe ec ON e.id = ec.employee_id
                    JOIN cafe c ON ec.cafe_id = c.id
                    WHERE c.location = '${location}'
                    AND c.name = '${cafeName}'
                    GROUP BY e.id, e.name, e.email_address, e.phone_number, cafe_name, c.location, ec.date_start, ec.date_end
                    ORDER BY days_worked DESC;`;
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
      const query = `SELECT e.*,
      CASE
        WHEN ec.date_end IS NULL THEN DATEDIFF(NOW(), ec.date_start)
        ELSE DATEDIFF(ec.date_end, ec.date_start)
      END AS days_worked,
      c.name AS 'cafe_name',
      c.location,
      ec.date_start,
      ec.date_end
    FROM employee e
    JOIN employee_cafe ec ON e.id = ec.employee_id
    JOIN cafe c ON ec.cafe_id = c.id
    WHERE c.location = '${location}'
    GROUP BY e.id, e.name, e.email_address, e.phone_number, cafe_name, c.location, ec.date_start, ec.date_end
    ORDER BY days_worked DESC;`;
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