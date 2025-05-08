const express = require("express");
const { apiController } = require("../controllers/apiController");

const Router = express.Router();

Router.get("/", apiController);

module.exports = Router;
