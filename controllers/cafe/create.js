const _ = require("lodash");

const create = (req, res) => {
  let cafe = req.body;

  if (_.isEmpty(cafe)) {
    res.status(400).json({ message: "request body cannot be empty" });
    return;
  }

  res.json(cafe);
};

module.exports = { create };
