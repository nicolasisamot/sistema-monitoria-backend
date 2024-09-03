const ErroBase = require("../erros/ErroBase");

class ErroValidacao extends ErroBase {
  constructor(erros) {
    const menssagem = erros.map((erro) => erro).join(";");
    super(menssagem, 400);
  }
}
module.exports = ErroValidacao;
