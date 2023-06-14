const CafeDeleteController = (cafeService) => ({
  deleteById: (req, res) => {
    cafeService.deleteCafeById(req, res)
      .then(() => {
        return res.sendStatus(200);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
});

module.exports = CafeDeleteController;
