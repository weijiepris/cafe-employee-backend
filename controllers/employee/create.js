const _ = require("lodash");

const create = (req, res) => {
  let employee = req.body;

  if (_.isEmpty(employee)) {
    res.status(400).json({ message: "request body cannot be empty" });
    return;
  }

  res.json(employee);
};

module.exports = { create };
