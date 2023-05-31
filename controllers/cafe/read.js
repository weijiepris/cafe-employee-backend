const { findAllCafe, findCafeByName } = require("../../service/cafeService");

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
    console.log("req query location: ", value);
    return res.status(200).json({
      message: "finding for cafe in location: " + value,
    });
  }
};

const findByName = (req, res, cafe) => {
  findCafeByName(cafe)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        message: "location not found",
      });
    });
};

module.exports = { findAll, findByName };
