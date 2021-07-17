const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

dotenv.config({ path: "./config.env" });

require("./db/conn");

app.use(express.json());

app.use(require("./router/auth"));

const User = require("./models/Schema");

const PORT = process.env.PORT || 5000;

app.listen(`${PORT}`, () => {
  console.log(`Server has started at ${PORT}`);
});
