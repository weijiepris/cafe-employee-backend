const db = require("../config/mysql");

const Cafe = {};

Cafe.findAll = () => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM cafe";
    db.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

// Cafe.findById = (id) => {
//   return new Promise((resolve, reject) => {
//     let query = "SELECT * FROM cafe WHERE ID = " + id;
//     db.query(query, (error, result) => {
//       if (error) {
//         reject(error);
//       }
//       resolve(result);
//     });
//   });
// };

// Cafe.deleteById = (id) => {
//   return new Promise(async (resolve, reject) => {
//     const employee = await Cafe.findById(id);

//     if (employee.length === 0) {
//       reject(`employee with id ${id} does not exist`);
//     }

//     let query = "DELETE FROM employee WHERE ID = " + id;
//     db.query(query, (error, result) => {
//       if (error) {
//         reject(error);
//       }
//       resolve(result);
//     });
//   });
// };

module.exports = Cafe;
