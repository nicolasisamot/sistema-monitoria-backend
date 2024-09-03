const db = require("../models/index.js");

class Services {
  constructor(model) {
    this.model = model;
  }

  async pegarTodosRegistros(transacao = null) {
    return await db[this.model].findAll({ transaction: transacao });
  }

  async pegarRegistroPorId(id, transacao = null) {
    return await db[this.model].findByPk(id, {
      transaction: transacao,
    });
  }
  async pegarRegistroPorUmaPropiedade(objBusca, transacao = null) {
    return await db[this.model].findOne({
      where: objBusca,
      transaction: transacao,
    });
  }
  async pegarRegistrosObjBusca(objBusca, transacao = null) {
    return await db[this.model].findAll({
      where: objBusca,
      transaction: transacao,
    });
  }

  async criarRegistro(novoRegistro, transacao = null) {
    return await db[this.model].create(novoRegistro, {
      transaction: transacao,
    });
  }

  async deletarRegistroPorId(id, transacao = null) {
    return await db[this.model].destroy({
      where: { id },
      transaction: transacao,
    });
  }

  async restaurarRegistroDeletadoPorId(id, transacao = null) {
    return await db[this.model].restore({
      where: { id },
      transaction: transacao,
    });
  }
  async ativarRegistroPorId(id, transacao = null) {
    return await db[this.model].update(
      { ativo: true },
      { where: { id }, transaction: transacao }
    );
  }

  async desativarRegistroPorId(id, transacao = null) {
    return await db[this.model].update(
      { ativo: false },
      { where: { id }, transaction: transacao }
    );
  }

  async pegarRegistrosPorObjBusca(objBusca, transacao = null) {
    return await db[this.model].findAll({
      where: objBusca,
      transaction: transacao,
    });
  }

  async atualizarRegistroPorId(id, objAtualizado, transacao = null) {
    return await db[this.model].update(objAtualizado, {
      where: { id },
      transaction: transacao,
    });
  }
}

module.exports = Services;
