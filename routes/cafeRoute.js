const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const CafeReadController = require("../controllers/cafe/read");
const CafeDeleteController = require("../controllers/cafe/delete");
const CafeUpdateController = require("../controllers/cafe/update");
const CafeCreateController = require("../controllers/cafe/create");

const cafeRoutes = (db, cafeService) => {
    const cafeReadController = CafeReadController(cafeService);
    const cafeDeleteController = CafeDeleteController(cafeService);
    const cafeUpdateController = CafeUpdateController(cafeService);
    const cafeCreateController = CafeCreateController(cafeService);

    router.get("/", cafeReadController.findAll);
    router.get("/name/:name", cafeReadController.findByCafeName);
    router.get("/location/:location", cafeReadController.findByLocation);
    router.post("/", upload.single("image"), cafeCreateController.create);
    router.put("/", cafeUpdateController.update);
    router.delete("/:id", cafeDeleteController.deleteById);

    return router;
}

module.exports = cafeRoutes;
