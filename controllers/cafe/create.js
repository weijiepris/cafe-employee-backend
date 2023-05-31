const _ = require("lodash");

const { validateCafe } = require("./utilities/validator");
const { generateUUID } = require("./utilities/uuid");
const { createCafe } = require("../../service/cafeService");

const create = (req, res) => {
  console.log("accessing create in /cafes ");

  let cafe = req.body;
  console.log(cafe);
  if (!validateCafe(cafe)) {
    res.status(400).json({ message: "One or more information about Cafe not found" });
    return;
  }

  cafe.id = generateUUID();

  console.log("generated new ID ", cafe);
  createCafe(cafe)
    .then(() => {
      res.status(200).json(cafe);
    })
    .catch((err) => {
      res.status(400).json({ message: err.code });
      return;
    });
};

module.exports = { create };
