const _ = require("lodash");

const { validateCafe } = require("./utilities/validator");
const CafeService = require("../../service/cafeService");

const update = async (req, res) => {
  console.log("accessing update in /cafes ");
  let cafe = req.body;

  if (!validateCafe(cafe)) {
    return res
      .status(400)
      .json({ message: "One or more information about Cafe not found" });
  }

  const cafeExists = await CafeService.findCafeById(cafe.id).then(
    (response) => response
  );
  if (cafeExists.length === 0) {
    return res
      .status(400)
      .json({ message: `Cafe with id '${cafe.id}' does not exist` });
  }

  CafeService.updateCafe(cafe).then(() => {
    return res.status(200).json({ message: "success" });
  });
};

module.exports = { update };
