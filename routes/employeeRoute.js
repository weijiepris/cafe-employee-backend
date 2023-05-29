const express = require("express");
const router = express.Router();

const { findAll, findById, deleteById } = require("../controllers/employeeController");

router.get("/", findAll);
router.get("/:id", findById);
router.delete("/:id", deleteById);

module.exports = router;
