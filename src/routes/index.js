const userRotas = require("./userRotas.js");
const feedbackRotas = require("./feedbackRotas.js");
const ligacaoRotas = require("./ligacaoRotas.js");
const authRotas = require("./authRotas.js");

function usarRotas(app) {
  app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
  });
  app.use(userRotas, ligacaoRotas, feedbackRotas, authRotas);
}

module.exports = usarRotas;
