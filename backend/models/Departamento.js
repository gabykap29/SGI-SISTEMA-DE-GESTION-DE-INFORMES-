const {sequelize, DataTypes} = require('../db');
'use strict';


const Departamento = sequelize.define('Departamento',{
    idDepartamento:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    nombre:{
        type: DataTypes.STRING,
    }
},{
    sequelize,
    paranoid:true,
    modelName: 'Departamento',
    tableName: 'departamento'
})

console.log(Departamento);
Departamento.sync();


module.exports = Departamento;