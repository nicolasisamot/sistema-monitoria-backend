const express = require("express");
const FeedbackController = require("../controllers/FeedbackController.js");
const validaToken = require("../middlewares/validaToken.js");

const feedbackRotas = express.Router();

const feedbackController = new FeedbackController();

feedbackRotas.post("/feedbacks/criar", validaToken, (req, res, next) =>
  feedbackController.cadastrarFeedback(req, res, next)
);
feedbackRotas.get("/feedbacks/:id", (req, res, next) =>
  feedbackController.pegarRegistroPorId(req, res, next)
);

feedbackRotas.delete("/feedbacks/deletar/:id", (req, res, next) =>
  feedbackController.deletarRegistroPorId(req, res, next)
);
module.exports = feedbackRotas;
