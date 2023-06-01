const express = require("express");
const { findAll } = require("../controllers/cafe/read");
const { create } = require("../controllers/cafe/create");
const { update } = require("../controllers/cafe/update");
const { deleteById } = require("../controllers/cafe/delete");

const router = express.Router();

router.get("/", findAll);
router.post("/", create);
router.put("/", update);
router.delete("/", deleteById);

module.exports = router;
