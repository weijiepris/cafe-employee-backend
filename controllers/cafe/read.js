const CafeService = require("../../service/cafeService");

const CafeReadController = {
  findAll: (req, res) => {
    CafeService.findAllCafe(req, res)
      .then((response) => {
        console.log(response);

        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },

  findByCafeName: (req, res) => {
    CafeService.findCafeLocationByName(req, res)
      .then((response) => {
        response.forEach((obj) => {
          if (obj.logo) {
            obj.logo.toString("base64");
          }
        });

        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },

  findByLocation: (req, res) => {
    CafeService.findCafeByLocation(req, res)
      .then((response) => {
        response.forEach((obj) => {
          if (obj.logo) {
            obj.logo.toString("base64");
          }
        });

        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
};

module.exports = CafeReadController;
