const {sequelize, DataTypes} = require('../db');

const Usuario = sequelize.define('Usuario',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull:false
    }
    ,
    pass:{
        type: DataTypes.STRING,
        allowNull:false
    },
    rol: {
        type: DataTypes.STRING,
        allowNull:false
    },   
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }},{
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        tableName: 'usuarios'
    });

Usuario.sync();


module.exports = Usuario;