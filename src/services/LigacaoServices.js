const Services = require("./Services.js");
const db = require("../models/index.js");
const moment = require("moment");

class LigacaoServices extends Services {
  constructor() {
    super("Ligacao");
  }

  async pegarLigacoesPorParametro(objBusca, paginacao, transacao = {}) {
    const ligacoes = await db[this.model].findAll({
      where: objBusca,
      attributes: {
        include: ["id", "idOperador", "idFeedback", "data"],
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      include: {
        model: db.User,
        attributes: ["nome"],
      },
      limit: paginacao.limit,
      offset: paginacao.offset,
    });

    return ligacoes.map((ligacao) => {
      return {
        id: ligacao.dataValues.id,
        data: moment(ligacao.dataValues.data).format("DD/MM/YYYY HH:mm:ss"),
        idOperador: ligacao.dataValues.idOperador,
        idFeedback: ligacao.dataValues.idFeedback,
        nomeOperador: ligacao.dataValues.User.dataValues.nome,
      };
    });
  }
}

module.exports = LigacaoServices;
