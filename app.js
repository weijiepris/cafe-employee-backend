const express = require("express");
const cors = require("cors");
const app = express();

const initialiseApp = (db, cafeService, employeeService) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // routes
    const cafeRoutes = require("./routes/cafeRoute");
    const employeeRoutes = require("./routes/employeeRoute");

    app.use("/cafes", cafeRoutes(db, cafeService));
    app.use("/employees", employeeRoutes(db, employeeService));

    app.get("/", (req, res) => {
        res.status(200).send({message: "connected successfully"});
    });
    app.get("*", (req, res) => {
        res.status(400).send("Invalid route");
    });

    return app;
};

module.exports = initialiseApp;
