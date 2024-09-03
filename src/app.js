const express = require("express");
const cors = require("cors");
const usarRotas = require("./routes/index.js");
const manejaErros = require("./middlewares/manejaErro.js");
const manipulador404 = require("./middlewares/manipulador404.js");

const app = express();
app.use(cors());
app.use(express.json());
usarRotas(app);
app.use(manipulador404);
app.use(manejaErros);

module.exports = app;
