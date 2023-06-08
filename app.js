const express = require("express");
const cors = require("cors");
const app = express();

const initialiseApp = (db) => {
  // to allow access into backend
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // routes
  const cafeRoutes = require("./routes/cafeRoute");
  const employeeRoutes = require("./routes/employeeRoute");

  app.use("/cafes", cafeRoutes);
  app.use("/employees", employeeRoutes);

  app.get("/", (req, res) => {
    console.log("connected to /");
    res.status(200).send({ message: "connected successfully" });
  });

  return app;
};

module.exports = initialiseApp;
