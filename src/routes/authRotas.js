const express = require("express");
const AuthController = require("../controllers/AuthController.js");

const authRotas = express.Router();

const authController = new AuthController();

authRotas.post("/login", (req, res, next) =>
  authController.login(req, res, next)
);
authRotas.get("/verificartoken", (req, res, next) =>
  authController.verificarToken(req, res, next)
);

module.exports = authRotas;
