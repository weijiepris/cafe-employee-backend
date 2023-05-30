const { findAllCafe } = require("../../service/cafeService");

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
      message: "location found",
    });
  }
};

module.exports = { findAll };
