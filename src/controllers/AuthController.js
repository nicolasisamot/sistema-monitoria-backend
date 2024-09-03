require("dotenv").config();
const UserServices = require("../services/UserServices.js");
const Controller = require("./Controller.js");
const userServices = new UserServices();
const ErroBase = require("../erros/ErroBase");
const ErroValidacao = require("../erros/ErroValidacao");
const ErroAutenticacao = require("../erros/ErroAutenticacao.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "secret";

class AuthController extends Controller {
  constructor() {
    super(userServices);
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const errosEncontrados = [];
      if (!username) {
        errosEncontrados.push("Campo username é obrigatório para fazer login.");
      }
      if (!password) {
        errosEncontrados.push("Campo password é obrigatório para fazer login.");
      }
      if (!errosEncontrados.length == 0) {
        throw new ErroValidacao(errosEncontrados);
      } else {
        const usernameEncontrado =
          await userServices.pegarRegistroPorUmaPropiedade({
            username: username,
          });

        if (usernameEncontrado == null) {
          throw new ErroAutenticacao(["Username ou password incorretos."]);
        }
        const credenciasValidas = await bcrypt.compare(
          password,
          usernameEncontrado.password
        );

        if (credenciasValidas) {
          const token = jwt.sign(
            {
              user: {
                id: usernameEncontrado.id,
                nome: usernameEncontrado.nome,
                role: usernameEncontrado.role,
              },
            },
            SECRET,
            {
              expiresIn: "7d", // <- Faz com que o token expire depois de 4 dias
              algorithm: "HS256", // <- Indica o algoritmo de hash HS256 para criptografia
            }
          );
          res.status(200).json({
            resultado: "login realizado com sucesso!",
            token: token,
            user: {
              id: usernameEncontrado.id,
              nome: usernameEncontrado.nome,
              role: usernameEncontrado.role,
            },
            status: "SUCESSO",
          });
        } else {
          throw new ErroAutenticacao(["Username ou password incorretos."]);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async verificarToken(req, res, next) {
    try {
      if (!req.headers.authorization) {
        throw new ErroValidacao(["Token ausente."]);
      }
      const [, token] = req.headers.authorization.split(" ");

      const validaToken = (token) => {
        try {
          jwt.verify(token, SECRET);
          return true;
        } catch (error) {
          return false;
        }
      };

      if (validaToken(token)) {
        const decoded = jwt.decode(token);
        res.status(200).json({
          user: {
            id: decoded.user.id,
            nome: decoded.user.nome,
            role: decoded.user.role,
          },
          resultado: "Bearer " + token,
          menssagem: "TOKEN VALIDO",
          status: "SUCESSO",
        });
      } else {
        throw new ErroAutenticacao(["Token invalido."]);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
