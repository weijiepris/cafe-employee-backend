const {
  findAllCafe,
  findCafeByLocation,
} = require("../../service/cafeService");

const findAll = (req, res) => {
  console.log("accessing findAll in /cafes ");
  const value = req.query.location;
  if (!value) {
    findAllCafe()
      .then((response) => {
        const cafeList = response;
        return res.status(200).json({
          message: "cafe found",
          response: cafeList,
          records: cafeList.length,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: err,
          response: [],
        });
      });
  } else {
    findAllByLocation(req, res, value);
  }
};

const findAllByLocation = (req, res, location) => {
  console.log("accessing findAllByLocation from findAll() in /cafes ");
  findCafeByLocation(location)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        message: "location not found",
      });
    });
};

module.exports = { findAll, findAllByLocation };
