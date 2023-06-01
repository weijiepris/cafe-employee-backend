const express = require("express");
const { findAll } = require("../controllers/cafe/read");
const { create } = require("../controllers/cafe/create");
const router = express.Router();

router.get("/", findAll);
router.post("/", create);

module.exports = router;
