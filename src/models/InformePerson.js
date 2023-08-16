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
            model: 'Informes',
            key: 'idInforme',
        },
    },
    personId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Persons',
            key: 'idPerson',
        },
    },
});

// Definición de la relación muchos a muchos
// Informe.belongsToMany(Person, {
//     through: InformePerson,
//     foreignKey: 'idInforme',
// });
// Person.belongsToMany(Informe, {
//     through: InformePerson,
//     foreignKey: 'idPerson',
// });

module.exports = InformePerson;
