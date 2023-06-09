const CafeUpdateController = (cafeService) => ({
  update: (req, res) => {
    cafeService.updateCafe(req, res)
      .then((response) => {
        return res.status(200).json([response]);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
});

module.exports = CafeUpdateController;
