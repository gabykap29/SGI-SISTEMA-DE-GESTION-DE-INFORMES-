const { sequelize, Model, DataTypes } = require("../db");
const Informe = require("./Informe");

const Person = sequelize.define(
  "Person",
  {
    idPerson: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dni: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "No hay datos",
    },
    fechaNac: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locality: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "No hay datos",
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "No hay datos",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "No hay datos",
    },
    imgPersonId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "No hay datos",
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "No hay datos",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "No hay datos",
    },
    work: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "No hay datos",
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    paranoid: true,
    createdAt: true,
    deletedAt: true,
    modelName: "Person",
    tableName: "Persons",
  }
);

module.exports = Person;
