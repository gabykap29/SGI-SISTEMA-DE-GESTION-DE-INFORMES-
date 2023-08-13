const { sequelize, DataTypes } = require('../db');
const Sequelize = require('sequelize')
const Informe = require('./Informe');
const InformePerson = sequelize.define('InformePerson', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idInforme: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Informes', // Nombre del modelo 'Informe'
            key: 'idInforme', // Nombre del campo en el modelo 'Informe'
        },
    },
    idPerson: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Persons', // Nombre del modelo 'Person'
            key: 'idPerson', // Nombre del campo en el modelo 'Person'
        },
    },
}, {
    sequelize,
    paranoid: true,
    createdAt: true,
    deletedAt: true,
    modelName: 'Person',
    tableName: 'Persons',
    extends: Sequelize.Model 
});

InformePerson.sync(); // Esto sincroniza la tabla intermedia en la base de datos
module.exports = InformePerson;

