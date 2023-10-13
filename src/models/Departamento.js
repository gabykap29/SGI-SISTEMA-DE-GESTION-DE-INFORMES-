const {sequelize, DataTypes} = require('../db');
const Informe = require('./Informe');
const Localidad = require('./Localidad')

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
  Departamento.hasMany(Localidad, {
    foreignKey: 'Departamento_idDepartamento',
    as: 'Localidad',
  });



module.exports = Departamento;