const { sequelize, DataTypes } = require("../db");
const Person = require("./Person");
const InformePerson = require("./InformePerson");

const Informe = sequelize.define(
  "Informe",
  {
    idInforme: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Departamento_idDepartamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Localidad_idLocalidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Tipo_idTipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filesId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Informe: {
      type: DataTypes.STRING(4000),
      allowNull: false,
    },
    id_IdUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    paranoid: true,
    createdAt: true,
    deletedAt: true,
    modelName: "Informe",
    tableName: "informes",
  }
);

module.exports = Informe;
