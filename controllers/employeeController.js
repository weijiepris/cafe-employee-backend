const { response } = require("express");
const {
  findAllEmployee,
  findEmployeeById,
  deleteEmployeeById,
} = require("../service/employeeService");

const findAll = (req, res) => {
  findAllEmployee()
    .then((response) => {
      const employeeList = response;
      return res.status(200).json({
        message: "employee found",
        response: employeeList,
        records: employeeList.length,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
        response: [],
      });
    });
};

const findById = (req, res) => {
  const id = req.params.id;
  findEmployeeById(id)
    .then((response) => {
      const employee = response;
      if (employee.length === 0) {
        return res
          .status(200)
          .json({ message: "no records found", response: employee });
      }
      return res
        .status(200)
        .json({ message: "employee found", response: employee });
    })
    .catch((err) => {
      return res.status(400).json({ message: err, response: [] });
    });
};

const findByCafe = (req, res) => {};

const createEmployee = (req, res) => {};

const updateEmployee = (req, res) => {};

const deleteById = (req, res) => {
  const id = req.params.id;
  deleteEmployeeById(id)
    .then((response) => {
      const employee = response;
      console.log(employee);
      return res
        .status(200)
        .json({ message: "employee deleted", response: employee });
    })
    .catch((err) => {
      return res.status(404).json({ message: err, response: [] });
    });
};

module.exports = { findAll, findById, deleteById };
