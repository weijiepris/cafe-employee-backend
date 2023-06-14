const CafeCreateController = (cafeService) => ({
    create: (req, res) => {
        const {name, description, location} = req.body;
        try {
            req.file.buffer;
        } catch (err) {
            return res.status(400).json("Invalid file format. Only JPG, JPEG, PNG, and GIF files are allowed.");
        }

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

        return cafeService.createCafe(req, res)
            .then((response) => {
                return res.status(200).json(response);
            })
            .catch((err) => {
                return res.status(400).json(err);
            });
    },
});

module.exports = CafeCreateController;
