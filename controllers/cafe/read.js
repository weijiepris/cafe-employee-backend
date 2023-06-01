const CafeService = require("../../service/cafeService");

const CafeReadController = { findAll: () => {} };

CafeReadController.findAll = (req, res) => {
  CafeService.findAllCafe(req, res)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports = CafeReadController;
