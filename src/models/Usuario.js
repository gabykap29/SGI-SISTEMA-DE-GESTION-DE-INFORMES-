const { sequelize, DataTypes } = require('../db');
const Informe = require('./Informe')

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING(50), allowNull: false },
  password: { type: DataTypes.STRING(100), allowNull: false },
  estado: { type: DataTypes.BOOLEAN, defaultValue: true },
  rol: { type: DataTypes.STRING(20), allowNull: false },
  loginAttempts: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  lockUntil: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
}, {
  sequelize,
  paranoid: true,
  modelName: 'Usuario',
  tableName: 'Usuarios'
});

Usuario.hasMany(Informe, {
  foreignKey: 'id_IdUser', // Nombre correcto de la columna que conecta con la clave primaria en la tabla "Usuario"
  as: 'Informes',
});

console.log(Usuario);

Usuario.sync();

module.exports = Usuario;
