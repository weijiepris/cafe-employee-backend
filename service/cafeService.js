const Cafe = require("../models/cafeModel");

const findAllCafe = () => {
  return Cafe.findAll();
};

const findCafeById = (id) => {
  return Cafe.findById(id);
};

// const deleteEmployeeById = (id) => {
//   return Cafe.deleteById(id);
// };

module.exports = { findAllCafe, findCafeById };
