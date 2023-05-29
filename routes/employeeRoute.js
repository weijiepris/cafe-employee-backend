const express = require("express");
const router = express.Router();

const { findAll, findById } = require("../controllers/employeeController");

router.get("/", findAll);
router.get("/:id", findById);

module.exports = router;
