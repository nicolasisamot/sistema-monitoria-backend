const LigacaoServices = require("../services/LigacaoServices.js");
const Controller = require("./Controller.js");
const { Op } = require("sequelize");
const moment = require("moment");
const UserServices = require("../services/UserServices.js");

const ligacaoServices = new LigacaoServices();
const userServices = new UserServices();

class LigacaoController extends Controller {
  constructor() {
    super(ligacaoServices);
  }
  async pegarLigacoesPorParametro(req, res, next) {
    try {
      const {
        id,
        dataInicio,
        dataFinal,
        idOperador,
        idFeedback,
        nomeOperador,
        page,
        limit,
        feedbackAplicado,
      } = req.query;

      const where = {};
      const paginacao = {
        limit: limit ? Number(limit) : 5,
      };
      paginacao.offset = page ? (Number(page) - 1) * paginacao.limit : 0;

      if (feedbackAplicado) {
        switch (feedbackAplicado) {
          case "with":
            where.idFeedback = {
              [Op.ne]: null,
            };
            break;
          case "without":
            where.idFeedback = null;
            break;
          default:
            break;
        }
      }
      if (id) {
        where.id = id;
      }
      if (dataInicio || dataFinal) {
        where.data = {};

        where.data = {
          [Op.gte]: moment(dataInicio, "DD/MM/YYYY").format("YYYY-MM-DD"),
        };

        dataInicio ? (where.data[Op.gte] = dataInicio + " 00:00:00") : null;

        dataFinal ? (where.data[Op.lte] = dataFinal + " 23:59:59") : null;
      }
      if (nomeOperador) {
        const objBuscaOperador = {
          nome: {
            [Op.regexp]: `^${nomeOperador}`,
          },
        };
        const operador = await userServices.pegarRegistrosObjBusca(
          objBuscaOperador
        );
        if (operador != null) {
          const ids = operador.map((operador) => {
            return operador.dataValues.id;
          });
          where.idOperador = {
            [Op.in]: ids, // Usa Op.in para buscar registros com qualquer um dos IDs fornecidos
          };
        }
      }
      if (idOperador) {
        where.idOperador = idOperador;
      }
      if (idFeedback) {
        if (idFeedback == "null") {
          where.idFeedback = null;
        } else {
          where.idFeedback = Number(idFeedback);
        }
      }

      if (req.user.role == "operador") {
        where.idOperador = req.user.id;
      }

      const ligacoes = await this.services.pegarLigacoesPorParametro(
        where,
        paginacao
      );
      res.status(200).json({
        resultado: ligacoes,
        menssagem: "LIGACOES ENCONTRADOS",
        status: "SUCESSO",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LigacaoController;
