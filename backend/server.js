require("dotenv").config();
const express = require("express");
const cors = require("cors");

const getGeminiResponse = require("./src/services/geminiApi");
const geminiApiRoutes = require("./src/routes/apiRoutes");
require("colors"); // For environment variables

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/gemini", geminiApiRoutes);

app.listen(4000, () =>
  console.log("Server is running on port 4000".magenta.bold.underline)
);

module.exports = app;
