class ErroServidor extends Error {
  constructor(menssagem = "ERRO INTERNO DO SERVIDOR.", erroStatusCode = 500) {
    super();
    this.menssagem = menssagem;
    this.erroStatusCode = erroStatusCode;
  }
  enviarResposta(res) {
    res.status(this.erroStatusCode).json({
      menssagem: this.menssagem,
      erroStatusCod: this.erroStatusCode,
      status: "ERRO",
    });
  }
}

module.exports = ErroServidor;
