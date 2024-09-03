const ErroBase = require("../erros/ErroBase.js");

class ErroAutenticacao extends ErroBase {
  constructor(erros) {
    const errosEncontrados = erros.map((erro) => erro).join(";");
    super(errosEncontrados, 401);
  }
}

module.exports = ErroAutenticacao;
