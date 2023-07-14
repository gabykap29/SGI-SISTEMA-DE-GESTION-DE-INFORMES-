const {sequelize, DataTypes} = require('../db');
const Informe = require('./Informe');

// 'use strict';


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
Departamento.hasMany(Informe, {
    foreignKey: 'Departamento_idDepartamento',
    as: 'Informes',
  });

console.log(Departamento);
Departamento.sync();


module.exports = Departamento;