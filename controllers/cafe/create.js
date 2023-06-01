const CafeService = require("../../service/cafeService");

const CafeCreateController = { create: () => {} };

CafeCreateController.create = (req, res) => {
  return CafeService.createCafe(req, res)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports = CafeCreateController;
