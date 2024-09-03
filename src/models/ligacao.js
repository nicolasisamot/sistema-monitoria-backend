"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ligacao extends Model {
    static associate(models) {
      Ligacao.belongsTo(models.User, {
        foreignKey: "idOperador",
      });
      Ligacao.belongsTo(models.Feedback, {
        foreignKey: "idFeedback",
      });
      Ligacao.hasOne(models.Feedback, {
        foreignKey: "idLigacao",
      });
    }
  }
  Ligacao.init(
    {
      data: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "Ligacao",
      tableName: "ligacoes",
      timestamps: true,
      paranoid: true,
    }
  );
  return Ligacao;
};
