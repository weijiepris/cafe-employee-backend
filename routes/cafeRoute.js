const express = require("express");
const { findAll } = require("../controllers/cafe/read");
const { create } = require("../controllers/cafe/create");
const router = express.Router();

router.get("/", findAll);
router.post("/", create);

// •	Create a GET endpoint /cafes?location=<location>
// sorted by the highest number of employees first
// If a valid location is provided, it will filter the list to return only cafes that is within the area
// If an invalid location is provided, it should return an empty list
// If no location is provided, it should list down all cafes

module.exports = router;
