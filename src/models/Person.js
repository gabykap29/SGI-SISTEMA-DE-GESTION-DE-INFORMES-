const { sequelize, Model, DataTypes } = require('../db');
const Informe = require('./Informe');
const InformePerson = require('./InformePerson');

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
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    paranoid: true,
    createdAt: true,
    deletedAt: true,
    modelName: 'Person',
    tableName: 'Persons',
});

// Definición de la relación muchos a muchos
Person.belongsToMany(Informe, {
    through: InformePerson, // Modelo de la tabla intermedia
    foreignKey: 'PersonIdPerson', // Clave foránea en la tabla intermedia que apunta a Person
    otherKey: 'InformeIdInforme', // Clave foránea en la tabla intermedia que apunta a Informe
});
Person.sync();
module.exports = Person;