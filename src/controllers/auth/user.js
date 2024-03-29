const crtlUsuario = {};
const bcrypt = require("bcryptjs");
const Usuario = require("../../models/Usuario");

crtlUsuario.create = async (req, res) => {
  const { firstName, lastName, username, password, rol } = req.body;

  try {
    const existeUsuario = await Usuario.findOne({
      where: {
        username,
      },
    });

    if (existeUsuario) {
      throw {
        status: 400,
        message: "El usuario ya existe",
      };
    }

    // Encriptación de contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptado = await bcrypt.hash(password, salt);

    // Crear el usuario en la base de datos utilizando Sequelize
    const nuevoUsuario = await Usuario.create({
      firstName,
      lastName,
      username,
      password: passwordEncriptado,
      rol,
    });

    if (!nuevoUsuario) {
      throw {
        message: "Error al crear el usuario",
      };
    }

    res.status(201).json(nuevoUsuario);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({
      message: err.message || "Error al crear el usuario",
    });
  }
};

//obtener los datos de un unico usuario

crtlUsuario.userRead = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      throw {
        status: 404,
        message: "El usuario no existe",
      };
    }

    return res.json(usuario);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

//obtener todoss los usuarios

crtlUsuario.usersRead = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where: {
        estado: true,
      },
    });

    if (!usuarios) {
      throw {
        status: 404,
        message: "No se encontraron usuarios",
      };
    }
    return res.status(200).json(usuarios);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({
      message: err.message || "error al obtener los usuarios",
    });
  }
};

crtlUsuario.userUpdate = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, username, password, rol } = req.body;
  // Encriptación de contraseña
  let passwordEncriptado;
  if (password) {
    // Encriptación de contraseña solo si se proporciona una nueva contraseña
    const salt = await bcrypt.genSalt(10);
    passwordEncriptado = await bcrypt.hash(password, salt);
  }
  try {
    const usuarioActualizado = await Usuario.update(
      {
        firstName,
        lastName,
        username,
        password: passwordEncriptado,
        rol,
      },
      {
        where: {
          id,
        },
      }
    );
    if (!usuarioActualizado) {
      throw {
        status: 400,
        message: "No se pudo actualizar el Usuario",
      };
    }
    return res.json({
      message: "Usuario actualizado correctamente",
      usuarioActualizado,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.status || "Error interno del Servidor al actualzar");
  }
};

//Eliminar usuario (metodo lógico)

crtlUsuario.userDelete = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si el usuario existe y su estado es true (activo)
    const usuario = await Usuario.findOne({
      where: {
        id: id,
        estado: true,
      },
    });

    if (!usuario) {
      throw {
        status: 404,
        message: "Usuario no encontrado o ya eliminado",
      };
    }

    // Actualizar el estado del usuario a false (eliminado)
    await Usuario.update(
      {
        estado: false,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.json({
      message: "Usuario eliminado con éxito",
    });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error del servidor al eliminar",
    });
  }
};

module.exports = crtlUsuario;
