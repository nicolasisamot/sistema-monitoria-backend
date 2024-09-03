"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      Feedback.belongsTo(models.User, { foreignKey: "idMonitor" });
      Feedback.belongsTo(models.Ligacao, { foreignKey: "idLigacao" });
      Feedback.hasOne(models.Ligacao, {
        foreignKey: "idFeedback",
      });
    }
  }
  Feedback.init(
    {
      nota: DataTypes.INTEGER,
      comentario: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Feedback",
      tableName: "feedbacks",
      timestamps: true,
      paranoid: true,
    }
  );
  return Feedback;
};
