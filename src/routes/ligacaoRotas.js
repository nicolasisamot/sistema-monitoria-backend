const express = require("express");
const LigacaoController = require("../controllers/LigacaoController.js");
const validaToken = require("../middlewares/validaToken.js");

const ligacaoRotas = express.Router();

const ligacaoController = new LigacaoController();

ligacaoRotas.get(
  "/ligacoes/q",
  (req, res, next) => validaToken(req, res, next),
  (req, res, next) =>
    ligacaoController.pegarLigacoesPorParametro(req, res, next)
);
ligacaoRotas.post("/ligacoes/criar", (req, res, next) =>
  ligacaoController.criarRegistro(req, res, next)
);

module.exports = ligacaoRotas;
