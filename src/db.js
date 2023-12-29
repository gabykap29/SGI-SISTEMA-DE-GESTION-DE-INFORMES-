const { Sequelize, Model, DataTypes } = require("sequelize");
require("dotenv").config();
const { promisify } = require("util");
const jwts = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    define: {
      // Desactivar migraciones automáticas
      timestamps: false,
    },
  }
);

//Zona de peligro

const destroyDatabase = async (req, res) => {
  const Usuario = require("./models/Usuario");
  const { pass } = req.body;
  const token = req.cookies.jwt;

  try {
    // Validar que se proporciona una contraseña
    if (!pass) {
      return res.status(400).json({ message: "Password is required" });
    }

    const tokenDecoded = await promisify(jwts.verify)(
      token,
      process.env.SECRET_KEY
    );

    // Verificar si el usuario existe
    const user = await Usuario.findByPk(tokenDecoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verificar la contraseña
    const passCorrect = bcrypt.compareSync(pass, user.password);
    console.log(passCorrect);
    if (!passCorrect) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verificar el rol del usuario
    if (tokenDecoded.rol !== "Moderate") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Eliminar la base de datos
    await sequelize.drop();

    return res.status(200).json({ message: "Database destroyed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  sequelize,
  DataTypes,
  Model,
  destroyDatabase,
};
