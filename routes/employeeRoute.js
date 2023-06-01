const express = require("express");
const { findAll } = require("../controllers/employee/read");
const { create } = require("../controllers/employee/create");
const { deleteById } = require("../controllers/employee/delete");
const router = express.Router();

router.get("/", findAll);
router.post("/", create);
router.delete("/", deleteById);

module.exports = router;
