const {sequelize, DataTypes} = require('../db');

// 'use strict';
const Usuario = sequelize.define('Usuario', {
  firstName: {type: DataTypes.STRING},
  lastName: { type: DataTypes.STRING },
  username: { type: DataTypes.STRING(50) },
  password: { type: DataTypes.STRING(100) },
  estado:{type: DataTypes.BOOLEAN, defaultValue:true },
  rol: { type: DataTypes.STRING(20) }
}, {
  sequelize,
  paranoid: true,
  modelName: 'Usuario',
  tableName: 'Usuarios',
//   underscored: true
})

console.log(Usuario);

Usuario.sync();


module.exports = Usuario;