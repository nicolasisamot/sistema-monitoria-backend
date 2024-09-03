var validator = require("validator");
const UserServices = require("../services/UserServices.js");
const userServices = new UserServices();

async function validarInputs(nome, email, username, password, role) {
  let errosEncontrados = [];
  let objResposta = {};
  const validacaoNome = validarNome(nome);
  const validacaoEmail = await validarEmail(email);
  const validacaoUsername = await validarUsername(username);
  const validacaoPassword = validarPassword(password);
  const validacaoRole = validarRole(role);

  errosEncontrados = [
    ...validacaoNome.errosEncontrados,
    ...validacaoEmail.errosEncontrados,
    ...validacaoUsername.errosEncontrados,
    ...validacaoPassword.errosEncontrados,
    ...validacaoRole.errosEncontrados,
  ];

  if (errosEncontrados.length == 0) {
    objResposta.valido = true;
    objResposta.nome = validacaoNome.nome;
    objResposta.email = validacaoEmail.email;
    objResposta.username = validacaoUsername.username;
    objResposta.password = validacaoPassword.password;
    objResposta.role = validacaoRole.role;
    return objResposta;
  } else {
    objResposta = {};
    objResposta.valido = false;
    objResposta.errosEncontrados = errosEncontrados;
    return objResposta;
  }
}

function validarNome(nome) {
  const nomeRegex = /^[a-zA-Z\s]+$/;
  let objResposta = {};
  let errosEncontrados = [];
  if (nome === null || nome === undefined || validator.isEmpty(nome)) {
    errosEncontrados.push("Campo nome é obrigatório.");
  } else {
    if (!validator.isLength(nome, { min: 3, max: 50 })) {
      errosEncontrados.push("Campo nome deve ter entre 3 e 50 caracteres.");
    }
    if (!nomeRegex.test(nome)) {
      errosEncontrados.push("Campo nome deve conter apenas letras e espaços.");
    }
    if (errosEncontrados.length == 0) {
      objResposta.nome = nome;
    }
  }
  objResposta.errosEncontrados = errosEncontrados;
  return objResposta;
}
async function validarEmail(email) {
  let objResposta = {};
  let errosEncontrados = [];
  if (email === null || email === undefined || validator.isEmpty(email)) {
    errosEncontrados.push("Campo email é obrigatório.");
  } else {
    const emailNormalizado = validator.normalizeEmail(email);

    if (!validator.isEmail(emailNormalizado)) {
      errosEncontrados.push("Campo email deve ser um e-mail valido.");
    } else {
      const emailEncontrado = await userServices.pegarRegistroPorUmaPropiedade({
        email: emailNormalizado,
      });
      if (emailEncontrado != null) {
        errosEncontrados.push("Campo email já esta sendo utilizado.");
      }
      if (errosEncontrados.length == 0) {
        objResposta.email = emailNormalizado;
      }
    }
  }
  objResposta.errosEncontrados = errosEncontrados;

  return objResposta;
}
async function validarUsername(username) {
  let objResposta = {};
  let errosEncontrados = [];
  const usernameRegex = /^[a-z0-9]+([a-z0-9]+)*$/;
  if (
    username === null ||
    username === undefined ||
    validator.isEmpty(username)
  ) {
    errosEncontrados.push("Campo username é obrigatório.");
  } else {
    const usernameLowerCase = username.toLowerCase();
    if (!validator.isLength(usernameLowerCase, { min: 6, max: 50 })) {
      errosEncontrados.push("Campo username deve ter entre 6 e 50 caracteres.");
    }
    if (!usernameRegex.test(usernameLowerCase)) {
      errosEncontrados.push(
        "Campo username deve conter apenas letras e números."
      );
    }
    if (errosEncontrados.length == 0) {
      const usernameEncontrado =
        await userServices.pegarRegistroPorUmaPropiedade({
          username: usernameLowerCase,
        });
      if (usernameEncontrado != null) {
        errosEncontrados.push("Campo username já esta sendo utilizado.");
      }
      if (errosEncontrados.length == 0) {
        objResposta.username = usernameLowerCase;
      }
    }
  }

  objResposta.errosEncontrados = errosEncontrados;
  return objResposta;
}
function validarPassword(password) {
  let objResposta = {};
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const hasNumber = /[0-9]/;
  let errosEncontrados = [];

  if (
    password === null ||
    password === undefined ||
    validator.isEmpty(password)
  ) {
    errosEncontrados.push("Campo password é obrigatório.");
  } else {
    if (!validator.isLength(password, { min: 8, max: 50 })) {
      errosEncontrados.push("Campo password deve ter entre 8 e 50 caracteres.");
    }
    if (!hasUppercase.test(password)) {
      errosEncontrados.push(
        "Campo password deve conter pelo menos uma letra maiúscula."
      );
    }
    if (!hasLowercase.test(password)) {
      errosEncontrados.push(
        "Campo password deve conter pelo menos uma letra minúscula."
      );
    }
    if (!hasNumber.test(password)) {
      errosEncontrados.push("Campo password deve conter pelo menos um número.");
    }
    if (!hasSpecialChar.test(password)) {
      errosEncontrados.push(
        "Campo password deve conter pelo menos um caractere especial."
      );
    }
    if (/\s/.test(password)) {
      errosEncontrados.push("Campo password não deve conter espaços.");
    }
    if (errosEncontrados.length == 0) {
      objResposta.password = password;
    }
  }

  objResposta.errosEncontrados = errosEncontrados;
  return objResposta;
}
function validarRole(role) {
  let objResposta = {};
  let errosEncontrados = [];
  if (role === null || role === undefined || validator.isEmpty(role)) {
    errosEncontrados.push("Campo role é obrigatório.");
  } else {
    const roleLowerCase = role.toLowerCase();
    const rolesAceitas = ["operador", "monitor"];
    if (!rolesAceitas.includes(roleLowerCase)) {
      errosEncontrados.push(
        "Campo role deve ter o valor de operador ou monitor."
      );
    }
    if (errosEncontrados.length == 0) {
      objResposta.role = roleLowerCase;
    }
  }
  objResposta.errosEncontrados = errosEncontrados;

  return objResposta;
}

module.exports = validarInputs;
