const { sequelize, DataTypes } = require('../db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: { type: DataTypes.STRING, allowNull:false },
  lastName: { type: DataTypes.STRING, allowNull:false },
  username: { type: DataTypes.STRING(50),allowNull:false },
  password: { type: DataTypes.STRING(100),allowNull:false  },
  estado: { type: DataTypes.BOOLEAN, defaultValue: true },
  rol: { type: DataTypes.STRING(20),allowNull:false  }
}, {
  sequelize,
  paranoid: true,
  modelName: 'Usuario',
  tableName: 'Usuarios'
});

console.log(Usuario);

Usuario.sync();

module.exports = Usuario;