const CafeService = require("../../service/cafeService");

const CafeCreateController = {
  create: (req, res) => {
    const { name, description, location } = req.body;
    const imageFile = req.file.buffer;

    const imageBuffer = Buffer.from(imageFile, 'base64');

    // transform data
    const cafe = {
      name,
      description,
      location,
      logo: imageBuffer,
    };

    req.body = cafe;

    return CafeService.createCafe(req, res)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },
};

module.exports = CafeCreateController;
