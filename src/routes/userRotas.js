const express = require("express");
const UserController = require("../controllers/UserController.js");

const userRotas = express.Router();

const userController = new UserController();

userRotas.get("/users", (req, res, next) =>
  userController.pegarTodosRegistros(req, res, next)
);

userRotas.get("/users/:id", (req, res, next) =>
  userController.pegarRegistroPorId(req, res, next)
);
//DEF
userRotas.post("/users/criar", (req, res, next) =>
  userController.cadastrarUsuario(req, res, next)
);
userRotas.delete("/users/deletar/:id", (req, res, next) =>
  userController.deletarRegistroPorId(req, res, next)
);
userRotas.patch("/users/restaurar/:id", (req, res, next) => {
  userController.restaurarRegistroDeletadoPorId(req, res, next);
});
userRotas.patch("/users/desativar/:id", (req, res, next) =>
  userController.desativarRegistroPorId(req, res, next)
);
userRotas.patch("/users/ativar/:id", (req, res, next) => {
  userController.ativarRegistroPorId(req, res, next);
});

module.exports = userRotas;
