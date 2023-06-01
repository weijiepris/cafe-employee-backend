const { deleteEmployeeById } = require("../../service/employeeService");

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

module.exports = { deleteById };
