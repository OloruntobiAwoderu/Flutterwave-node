const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const homeRoute = require("./homeRoute");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", homeRoute);

app.use("/*", (req, res) =>
  res.status(404).json({ message: "This endpoint does not exist" })
);

module.exports = app;