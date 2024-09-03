const Services = require("./Services.js");
const db = require("../models/index.js");
const LigacaoServices = require("./LigacaoServices.js");
const ErroBase = require("../erros/ErroBase.js");
const ErroValidacao = require("../erros/ErroValidacao.js");
const moment = require("moment");
const Erro404 = require("../erros/Erro404.js");

class FeedbackServices extends Services {
  constructor() {
    super("Feedback");
    this.ligacaoServices = new LigacaoServices();
  }

  async cadastrarFeedback(feedbackDados) {
    let feedbackCadastrado = false;
    const { idLigacao, idMonitor, nota, comentario } = feedbackDados;
    if (!idLigacao || !idMonitor || !nota || !comentario) {
      throw new ErroValidacao(["Falta informações para cadastrar feedback."]);
    }

    const transaction = await db.sequelize.transaction(async (transacao) => {
      const ligacao = await this.ligacaoServices.pegarRegistroPorId(
        idLigacao,
        transacao
      );
      if (ligacao == null) {
        throw new Erro404("ligação não encontrada.");
      }

      if (ligacao.dataValues.idFeedback == null) {
        const novoFeedback = await super.criarRegistro(
          feedbackDados,
          transacao
        );

        const ligacoesAtualizadoComIdFeedback =
          await this.ligacaoServices.atualizarRegistroPorId(
            Number(ligacao.dataValues.id),
            { idFeedback: novoFeedback.dataValues.id },
            transacao
          );

        feedbackCadastrado = novoFeedback;
      } else {
        throw new ErroValidacao("Feedback ja cadastrado.");
      }
    });

    return feedbackCadastrado;
  }

  async pegarRegistroPorId(id, transacao = null) {
    const resultado = await db[this.model].findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      include: [
        {
          model: db.User,
          attributes: ["nome"],
        },
        {
          model: db.Ligacao,
          attributes: ["idOperador", "data"],
          include: {
            model: db.User,
            attributes: ["nome"],
          },
        },
      ],
      transaction: transacao,
    });

    if (resultado == null) {
      throw new Erro404(["Feedback não encontrado."]);
    }
    return {
      id: resultado.dataValues.id,
      idMonitor: resultado.dataValues.idMonitor,
      idLigacao: resultado.dataValues.idLigacao,
      idOperador: resultado.dataValues.Ligacao.idOperador,
      nota: resultado.dataValues.nota,
      dataLigacao: moment(resultado.dataValues.Ligacao.data).format(
        "DD/MM/YYYY HH:mm:ss"
      ),
      comentario: resultado.dataValues.comentario,
      nomeMonitor: resultado.dataValues.User.nome,
      nomeOperador: resultado.dataValues.Ligacao.User.nome,
    };
  }
}

module.exports = FeedbackServices;
