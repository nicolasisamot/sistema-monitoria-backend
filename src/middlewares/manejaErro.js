const ErroAutenticacao = require("../erros/ErroAutenticacao.js");
const ErroBase = require("../erros/ErroBase.js");
const ErroServidor = require("../erros/ErroServidor.js");
const ErroValidacao = require("../erros/ErroValidacao.js");

function manejaErros(error, req, res, next) {
  if (error instanceof ErroValidacao) {
    error.enviarResposta(res);
  } else if (error instanceof ErroAutenticacao) {
    error.enviarResposta(res);
  } else if (error instanceof ErroBase) {
    error.enviarResposta(res);
  } else {
    throw ErroServidor().enviarResposta(res);
  }
}

module.exports = manejaErros;
