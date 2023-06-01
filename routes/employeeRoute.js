const express = require("express");
const { findAll } = require("../controllers/employee/read");
const { create } = require("../controllers/employee/create");
const { update } = require("../controllers/employee/update");
const { deleteById } = require("../controllers/employee/delete");

const router = express.Router();

router.get("/", findAll);
router.post("/", create);
router.put("/", update);
router.delete("/", deleteById);


module.exports = router;
