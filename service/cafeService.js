const Cafe = require("../models/cafeModel");

const CafeService = {};
CafeService.findAllCafe = () => {
  return Cafe.findAll();
};

CafeService.findCafeById = (id) => {
  return Cafe.findById(id);
};

CafeService.findCafeByNameAndLocation = (req, res, cafe, location) => {
  return Cafe.findByNameAndLocation(cafe, location);
};

CafeService.findCafeByLocation = (location) => {
  return Cafe.findByLocation(location);
};

CafeService.createCafe = (cafe) => {
  return Cafe.create(cafe);
};

CafeService.updateCafe = (cafe) => {
  return Cafe.update(cafe);
};
// const deleteEmployeeById = (id) => {
//   return Cafe.deleteById(id);
// };

module.exports = CafeService;
