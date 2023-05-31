const Cafe = require("../models/cafeModel");

const findAllCafe = () => {
  return Cafe.findAll();
};

const findCafeById = (id) => {
  return Cafe.findById(id);
};

const findCafeByNameAndLocation = (req, res, cafe, location) => {
  return Cafe.findByNameAndLocation(cafe, location);
};

const createCafe = (cafe) => {
  return Cafe.create(cafe);
}
// const deleteEmployeeById = (id) => {
//   return Cafe.deleteById(id);
// };

module.exports = { findAllCafe, findCafeById, createCafe, findCafeByNameAndLocation };
