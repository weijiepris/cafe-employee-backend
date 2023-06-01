const express = require("express");
const CafeReadController = require("../controllers/cafe/read");
const CafeDeleteController = require("../controllers/cafe/delete");
const CafeUpdateController = require("../controllers/cafe/update");
const CafeCreateController = require("../controllers/cafe/create");

const router = express.Router();

router.get("/", CafeReadController.findAll);
router.post("/", CafeCreateController.create);
router.put("/", CafeUpdateController.update);
router.delete("/", CafeDeleteController.deleteById);

module.exports = router;
