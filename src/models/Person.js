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
        type: DataTypes.STRING(10),
        allowNull: true,
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
        imgPersonId:{
            type: DataTypes.INTEGER,
            allowNull:true,
        }
    ,facebook:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    instagram:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull:true,
    },work:{
        type:DataTypes.STRING,
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