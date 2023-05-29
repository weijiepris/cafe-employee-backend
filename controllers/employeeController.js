const { response } = require("express");
const {
  findAllEmployee,
  findEmployeeById,
} = require("../service/employeeService");

const findAll = async (req, res) => {
  const employeeList = await findAllEmployee();
  return res
    .status(200)
    .json({
      message: "employee found",
      response: employeeList,
      records: employeeList.length,
    });
};

const findById = async (req, res) => {
  const id = req.params.id;
  const employee = await findEmployeeById(id);
  console.log(employee);
  if (employee.length === 0) {
    return res
      .status(200)
      .json({ message: "no records found", response: employee });
  }
  return res
    .status(200)
    .json({ message: "employee found", response: employee });
};

const findByCafe = (req, res) => {};

const createEmployee = (req, res) => {};

const updateEmployee = (req, res) => {};

const deleteEmployee = (req, res) => {};

module.exports = { findAll, findById };
