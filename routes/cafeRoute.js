const express = require("express");
const multer = require("multer");

const CafeReadController = require("../controllers/cafe/read");
const CafeDeleteController = require("../controllers/cafe/delete");
const CafeUpdateController = require("../controllers/cafe/update");
const CafeCreateController = require("../controllers/cafe/create");

const router = express.Router();
const upload = multer();
console.log("HERE")

router.get("/", CafeReadController.findAll);
router.get("/name/:name", CafeReadController.findByCafeName);
router.get("/location/:location", CafeReadController.findByLocation);
router.post("/", upload.single("image"), CafeCreateController.create);
router.put("/", CafeUpdateController.update);
router.delete("/:id", CafeDeleteController.deleteById);

module.exports = router;
