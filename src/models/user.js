"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Ligacao, {
        foreignKey: "idOperador",
        allowNull: true,
      });
      User.hasMany(models.Feedback, {
        foreignKey: "idMonitor",
        allowNull: true,
      });
    }
  }
  User.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo nome é obrigatório",
          },
          notEmpty: {
            msg: "Campo nome não pode ser vazio",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo email é obrigatório",
          },
          notEmpty: {
            msg: "Campo email não pode ser vazio",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo username é obrigatório",
          },
          notEmpty: {
            msg: "Campo username não pode ser vazio",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo password é obrigatório",
          },
          notEmpty: {
            msg: "Campo password não pode ser vazio",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Campo role é obrigatório",
          },
          notEmpty: {
            msg: "Campo role não pode ser vazio",
          },
          isIn: {
            args: [["admin", "operador", "monitor"]],
            msg: "Campo role deve ter o valor ser admin, operador ou monitor",
          },
        },
      },
      ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      paranoid: true,
    }
  );
  return User;
};
