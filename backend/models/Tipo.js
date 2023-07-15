const {sequelize, DataTypes} = require('../db');
const Informe = require('./Informe');

const Tipo = sequelize.define('Tipo',{
    idTipo:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    paranoid:true,
    modelName:'Tipo',
    tableName:'tipo'
})
Tipo.hasMany(Informe, {
    foreignKey: 'Tipo_idTipo',
    as: 'Informes',
  });
Tipo.sync(); 
module.exports = Tipo;