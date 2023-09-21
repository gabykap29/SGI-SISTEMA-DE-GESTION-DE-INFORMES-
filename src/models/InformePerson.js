// InformePerson.js
const { sequelize, DataTypes } = require('../db');
const Informe = require('./Informe');
const Person = require('./Person');

const InformePerson = sequelize.define('InformePerson', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    informeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Informe',
            key: 'idInforme',
        },
    },
    personId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Person',
            key: 'idPerson',
        },
    },
});

InformePerson.sync()
module.exports = InformePerson;
