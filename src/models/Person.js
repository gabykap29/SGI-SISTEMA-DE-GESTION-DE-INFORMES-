const { sequelize, Model, DataTypes } = require('../db');
const Informe = require('./Informe');
// const InformePerson = require('./InformePerson')

const Person = sequelize.define('Person', {
    idPerson: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fechaNac:{
        type: DataTypes.DATE,
        allowNull:true,
    },
}, {
    sequelize,
    paranoid: true,
    createdAt: true,
    deletedAt: true,
    modelName: 'Person',
    tableName: 'Persons',
});


module.exports = Person;