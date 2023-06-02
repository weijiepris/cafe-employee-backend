const db = require("../config/mysql");

const Cafe = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT cafe.*, COUNT(employee.id) AS employees
                    FROM cafe
                    LEFT JOIN employee_cafe ON cafe.id = employee_cafe.cafe_id
                    LEFT JOIN employee ON employee_cafe.employee_id = employee.id
                    GROUP BY cafe.id, cafe.name
                    ORDER BY Employees DESC;`;
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
      const query = `SELECT * FROM cafe where id = '${id}'`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  findByNameAndLocation: (cafe, location) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM cafe where LOWER(name) = LOWER('${cafe}') and LOWER(location) = LOWER('${location}');`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  findByName: (cafe) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT cafe.name, cafe.description, COUNT(employee.id) AS employees, cafe.logo, cafe.location, cafe.id
                    FROM cafe
                    LEFT JOIN employee_cafe ON cafe.id = employee_cafe.cafe_id
                    LEFT JOIN employee ON employee_cafe.employee_id = employee.id
                    WHERE cafe.name = '${cafe}'
                    GROUP BY cafe.id, cafe.name
                    ORDER BY Employees DESC;`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  findByLocation: (location) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT cafe.name, cafe.description, COUNT(employee.id) AS employees, cafe.logo, cafe.location, cafe.id
                    FROM cafe
                    LEFT JOIN employee_cafe ON cafe.id = employee_cafe.cafe_id
                    LEFT JOIN employee ON employee_cafe.employee_id = employee.id
                    WHERE cafe.location = '${location}'
                    GROUP BY cafe.id, cafe.name
                    ORDER BY Employees DESC;`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  create: (cafe) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO cafe SET ?";
      db.query(query, cafe, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  update: (cafe) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE cafe SET ? WHERE id = '${cafe.id}'`;
      db.query(query, cafe, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM cafe WHERE ID = '${id}'`;
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
};

module.exports = Cafe;
