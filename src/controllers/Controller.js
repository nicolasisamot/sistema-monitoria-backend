const ErroBase = require("../erros/ErroBase");

class Controller {
  constructor(services) {
    this.services = services;
  }

  async pegarTodosRegistros(req, res, next) {
    try {
      const registros = await this.services.pegarTodosRegistros();

      res.status(200).json({
        resultado: registros,
        menssagem: "REGISTROS ENCONTRADOS",
        status: "SUCESSO",
      });
    } catch (error) {
      next(error);
    }
  }

  async pegarRegistroPorId(req, res, next) {
    try {
      const id = Number(req.params.id);
      const registro = await this.services.pegarRegistroPorId(id);
      res.status(200).json({
        resultado: registro,
        menssagem: "REGISTRO ENCONTRADO",
        status: "SUCESSO",
      });
    } catch (error) {
      next(error);
    }
  }

  async criarRegistro(req, res, next) {
    try {
      const novoRegistro = req.body;
      const registroCriado = await this.services.criarRegistro(novoRegistro);
      res.status(201).json({
        resultado: registroCriado,
        menssagem: "REGISTRO CRIADO",
        status: "SUCESSO",
      });
    } catch (error) {
      next(error);
    }
  }

  async deletarRegistroPorId(req, res, next) {
    try {
      const id = Number(req.params.id);
      const registroDeletado = await this.services.deletarRegistroPorId(id);
      if (registroDeletado != 1) {
        throw new ErroBase("REGISTRO NÃO ENCONTRADO", 404);
      }
      res.status(200).json({
        resultado: registroDeletado,
        menssagem: "REGISTRO DELETADO",
        status: "SUCESSO",
      });
    } catch (error) {
      next(error);
    }
  }
  async restaurarRegistroDeletadoPorId(req, res, next) {
    try {
      const id = Number(req.params.id);
      const registroRestaurado =
        await this.services.restaurarRegistroDeletadoPorId(id);
      if (registroRestaurado != 1) {
        throw new ErroBase("REGISTRO NÃO ENCONTRADO", 404);
      }
      res.status(200).json({
        resultado: registroRestaurado,
        menssagem: "REGISTRO RESTAURADO",
        status: "SUCESSO",
      });
    } catch (error) {
      next(error);
    }
  }

  async ativarRegistroPorId(req, res, next) {
    try {
      const id = Number(req.params.id);
      const registroAtivado = await this.services.ativarRegistroPorId(id);
      if (registroAtivado != 1) {
        throw new ErroBase("REGISTRO NÃO ENCONTRADO", 404);
      }
      res.status(200).json({
        resultado: registroAtivado,
        menssagem: "REGISTRO ATIVADO",
        status: "SUCESSO",
      });
    } catch (error) {
      next(error);
    }
  }

  async desativarRegistroPorId(req, res, next) {
    try {
      const id = Number(req.params.id);
      const registroDesativado = await this.services.desativarRegistroPorId(id);
      if (registroDesativado != 1) {
        throw new ErroBase("REGISTRO NÃO ENCONTRADO", 404);
      }
      res.status(200).json({
        resultado: registroDesativado,
        menssagem: "REGISTRO DESATIVADO",
        status: "SUCESSO",
      });
    } catch (error) {
      next(error);
    }
  }

  async pegarRegistrosPorObjBusca(req, res, next) {
    try {
      const objBusca = req.body;
      const registros = await this.services.pegarRegistrosPorObjBusca(objBusca);
      res.status(200).json({
        resultado: registros,
        menssagem: "REGISTROS ENCONTRADOS",
        status: "SUCESSO",
      });
    } catch (error) {
      next(error);
    }
  }

  async atualizarRegistroPorId(req, res, next) {
    try {
      const id = Number(req.params.id);
      const objAtualizado = req.body;
      const registroAtualizado = await this.services.atualizarRegistroPorId(
        id,
        objAtualizado
      );
      res.status(200).json({
        resultado: registroAtualizado,
        menssagem: "REGISTRO ATUALIZADO",
        status: "SUCESSO",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
