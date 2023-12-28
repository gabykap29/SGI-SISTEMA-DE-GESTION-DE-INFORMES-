const { sequelize, DataTypes } = require("../db");
const Informe = require("./Informe");

const Files = sequelize.define(
  "Files",
  {
    idFiles: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filesRoute: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descriptions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "Files",
    tableName: "Files",
  }
);

module.exports = Files;
