const UserServices = require("../services/UserServices.js");
const Controller = require("./Controller.js");
const userServices = new UserServices();
const ErroBase = require("../erros/ErroBase");
const ErroValidacao = require("../erros/ErroValidacao");
const validarInputsNovoUsuario = require("../utils/validarInputsNovoUsuario");
const bcrypt = require("bcrypt");

class UserController extends Controller {
  constructor() {
    super(userServices);
  }

  async cadastrarUsuario(req, res, next) {
    try {
      const { nome, email, username, password, role } = req.body;
      const resultadoValidacao = await validarInputsNovoUsuario(
        nome,
        email,
        username,
        password,
        role
      );

      if (resultadoValidacao.valido) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(
          resultadoValidacao.password,
          salt
        );
        const novoUser = {
          nome: resultadoValidacao.nome,
          email: resultadoValidacao.email,
          username: resultadoValidacao.username,
          password: passwordHash,
          role: resultadoValidacao.role,
        };
        await userServices.criarRegistro(novoUser);
      } else {
        throw new ErroValidacao(resultadoValidacao.errosEncontrados);
      }
      res.status(201).json({
        resultado: "usuarioCadastrado",
        menssagem: "USUARIO CADASTRADO",
        status: "SUCESSO",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
