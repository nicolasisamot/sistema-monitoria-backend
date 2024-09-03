const FeedbackServices = require("../services/FeedbackServices.js");
const Controller = require("./Controller.js");
const feedbackServices = new FeedbackServices();
const ErroBase = require("../erros/ErroBase.js");
const ErroAutenticacao = require("../erros/ErroAutenticacao.js");
const ErroValidacao = require("../erros/ErroValidacao.js");

class FeedbackController extends Controller {
  constructor() {
    super(feedbackServices);
  }

  async cadastrarFeedback(req, res, next) {
    try {
      if (req.user.role != "monitor") {
        throw new ErroAutenticacao(["Sem permissão."]);
      }
      req.body.idMonitor = req.user.id;
      const novoFeedback = await this.services.cadastrarFeedback(req.body);
      if (novoFeedback == false) {
        throw new ErroValidacao(["Erro ao cadastrar feedback."]);
      }

      res.status(201).json({
        resultado: novoFeedback,
        menssagem: "FEEDBACK CADASTRADO",
        status: "SUCESSO",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FeedbackController;
