const CafeReadController = (cafeService) => ({
  findAll: (req, res) => {
    cafeService
      .findAllCafe(req, res)
      .then((response) => {
        console.log("findAllCafe");
        return res.status(200).json(response);
      })
      .catch((err) => {
        console.log("HERE");
        return res.status(400).json(err);
      });
  },

  findByCafeName: (req, res) => {
    cafeService
      .findCafeLocationByName(req, res)
      .then((response) => {
        console.log("findByCafeName");
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },

  findByLocation: (req, res) => {
    cafeService
      .findCafeByLocation(req, res)
      .then((response) => {
        console.log("findByLocation");
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
});

module.exports = CafeReadController;
