const { sequelize, DataTypes } = require("../db");
const Informe = require("./Informe");
const bcrypt = require("bcryptjs");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  },
  {
    sequelize,
    paranoid: true,
    modelName: "Usuario",
    tableName: "Usuarios",
  }
);

Usuario.hasMany(Informe, {
  foreignKey: "id_IdUser", // Nombre correcto de la columna que conecta con la clave primaria en la tabla "Usuario"
  as: "Informes",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a la base de datos.");

    // Sincroniza el modelo con la base de datos
    await sequelize.sync();

    // Verifica si la base de datos está vacía
    const userCount = await Usuario.count();

    if (userCount === 0) {
      let password = "admin1234";
      const salt = await bcrypt.genSalt(10);
      const passwordEncriptado = await bcrypt.hash(password, salt);
      // Agrega un usuario por defecto si la base de datos está vacía
      await Usuario.create({
        firstName: "Primer",
        lastName: "Usuario",
        username: "Admin",
        password: passwordEncriptado,
        rol: "Moderate",
      });

      console.log("Usuario predeterminado creado.");
    }

    // Realiza operaciones con el modelo aquí
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
})();

Usuario.sync();

module.exports = Usuario;
