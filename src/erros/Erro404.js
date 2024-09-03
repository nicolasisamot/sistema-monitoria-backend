const ErroBase = require("./ErroBase.js");

class Erro404 extends ErroBase {
  constructor(mensagem = "Erro 404") {
    super(mensagem, 404);
  }
}

module.exports = Erro404;
