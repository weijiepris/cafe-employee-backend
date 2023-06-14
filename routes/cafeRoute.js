const express = require("express");
const multer = require("multer");
const CafeReadController = require("../controllers/cafe/read");
const CafeDeleteController = require("../controllers/cafe/delete");
const CafeUpdateController = require("../controllers/cafe/update");
const CafeCreateController = require("../controllers/cafe/create");
const CafeService = require("../service/cafeService");

const router = express.Router();
const upload = multer();

const validator = require("../service/utilities/validator");
const cafeModel = require("../models/cafeModel");
const db = require("../config/mysql");

// dependency injection
const cafeService = new CafeService(validator, cafeModel, db);

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

module.exports = router;
