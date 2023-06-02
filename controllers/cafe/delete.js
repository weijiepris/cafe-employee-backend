const CafeService = require("../../service/cafeService");

const CafeDeleteController = {
  deleteById: (req, res) => {
    CafeService.deleteCafeById(req, res)
      .then(() => {
        return res.sendStatus(200);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
};

module.exports = CafeDeleteController;