const ctrlReports = {};
const jwt = require("jsonwebtoken");
const Usuario = require("../../models/Usuario");
const {
  Person,
  Informe,
  Files,
  Departamento,
  Localidad,
  Tipo,
} = require("../../models/asossiations");
const InformePerson = require("../../models/InformePerson");

// Crear un Informe

ctrlReports.create = async (req, res) => {
  const {
    Departamento_idDepartamento,
    Localidad_idLocalidad,
    Titulo,
    Fecha,
    Observaciones,
    informe,
    isComplete,
  } = req.body;
  let { Tipo_idTipo } = req.body;

  //---------Se pide el token por si hacen peticiones directamente a las rutas ----------------------
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "no hay token en la petición" });
  }

  try {
    //obtener id de usuario
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const id = decoded.id;
    let rutaImagen = []; // Variable para almacenar la ruta de la imagen

    //Si el usuario ingresa un tipo personalizado
    if (Tipo_idTipo.length > 2) {
      const [tipo, created] = await Tipo.findOrCreate({
        where: { nombre: Tipo_idTipo },
        defaults: {
          nombre: Tipo_idTipo,
        },
      });
      Tipo_idTipo = tipo.idTipo;
    }

    const newInforme = await Informe.create({
      Departamento_idDepartamento,
      Localidad_idLocalidad,
      Tipo_idTipo,
      Titulo,
      Fecha,
      Observaciones,
      iv: "null",
      isComplet: true,
      Informe: informe,
      id_IdUser: id,
    });
    if (
      !Departamento_idDepartamento ||
      !Localidad_idLocalidad ||
      !Tipo_idTipo ||
      !Titulo ||
      !Fecha ||
      !informe
    ) {
      throw {
        message: "Favor, verifique todos los campos esten completos.",
      };
    }
    return res.status(201).json({ message: "Informe creado con exito!" });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

//Obtener un INFORME

ctrlReports.Read = async (req, res) => {
  const { id } = req.params;
  try {
    const informe = await Informe.findOne({
      where: {
        idInforme: id,
      },
      include: [
        {
          model: Departamento,
          as: "InformesDepart",
          attributes: ["nombre"],
        },
        {
          model: Localidad,
          as: "InformesLocal",
          attributes: ["nombre"],
        },
        {
          model: Tipo,
          as: "Tipo",
          attributes: ["nombre"],
        },
        {
          model: Person,
          as: "informePersons",
        },
        {
          model: Tipo,
          as: "Tipo",
          attributes: ["nombre"],
        },
        {
          model: Files,
          as: "Files",
        },
      ],
    });
    const idUser = informe.id_IdUser;
    const usuario = await Usuario.findByPk(idUser);
    if (!informe) {
      throw {
        status: 404,
        message: "El informe no existe!",
      };
    }

    // Obtener la ruta de la imagen si existe
    let rutaImagen = "";
    if (informe.RutaImagen) {
      rutaImagen = informe.RutaImagen;
    }

    // Crear un nuevo objeto de respuesta con la ruta de la imagen
    const informeConImagen = {
      ...informe.toJSON(),
      RutaImagen: rutaImagen,
      usuario: usuario.username,
    };

    return res.json(informeConImagen);
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error Interno del Servidor",
    });
  }
};

ctrlReports.readsAll = async (req, res) => {
  const { page = 0, size = 10 } = req.query;
  try {
    const informes = await Informe.findAll({
      where: {
        estado: true,
      },
      include: [
        {
          model: Tipo,
          as: "Tipo",
          attributes: ["nombre"],
        },
        {
          model: Departamento,
          as: "InformesDepart",
          attributes: ["nombre"],
        },
        {
          model: Localidad,
          as: "InformesLocal",
          attributes: ["nombre"],
        },
      ],
      limit: size,
      offset: page * size,
      order: [["createdAt", "DESC"]],
    });
    if (!informes) {
      thow({
        status: 404,
        message: "La base de datos está vacía",
      });
    }
    return res.status(200).json(informes);
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "error al obtener los informes",
    });
  }
};
ctrlReports.update = async (req, res) => {
  const token = req.cookies.jwt;
  const { idInforme } = req.params;
  const {
    Departamento_idDepartamento,
    Localidad_idLocalidad,
    Tipo_idTipo,
    Titulo,
    Fecha,
    Observaciones,
    informe,
  } = req.body;
  let rutaImagen;
  if (req.file) {
    rutaImagen = req.file.filename;
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const id = decoded.id;
    const informeUpdate = await Informe.update(
      {
        Departamento_idDepartamento,
        Localidad_idLocalidad,
        Tipo_idTipo,
        Titulo,
        Fecha,
        Observaciones,
        RutaImagen: rutaImagen,
        id_IdUser: id,
        Informe: informe,
      },
      {
        where: {
          idInforme: req.params.id,
        },
      }
    );
    if (!informeUpdate) {
      throw {
        status: 400,
        message: "error al actualizar el Informe",
      };
    }
    return res.json({
      message: "Informe actualizado correctamente",
      informeUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "error al actualzar",
    });
  }
};
ctrlReports.deleted = async (req, res) => {
  const { id } = req.params;
  const idInforme = id;
  try {
    const informeDeleted = await Informe.update(
      {
        estado: false,
      },
      {
        where: {
          idInforme,
          estado: true,
        },
      }
    );
    if (informeDeleted[0] === 0) {
      throw {
        status: 400,
        message: "Error al eliminar el Informe",
      };
    }
    return res.json({
      message: "Informe eliminado con éxito!",
    });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      error: error.message || "Error interno del servidor",
    });
  }
};

ctrlReports.complete = async (req, res) => {
  const { id } = req.params;
  try {
    const informe = await Informe.findByPk(id);
    if (!informe) {
      throw {
        status: 404,
        message: "El informe no existe!",
      };
    }
    if (informe.isComplete === true) {
      throw {
        status: 400,
        message: "El informe ya fue completado!",
      };
    }
    const complete = await Informe.update(
      {
        isComplete: true,
      },
      {
        where: {
          idInforme: id,
        },
      }
    );
    return res.status(201).json({ message: "Informe completado con exito!" });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error Interno del Servidor",
    });
  }
};

ctrlReports.getTypeReport = async (req, res) => {
  try {
    const type = await Tipo.findAll();
    if (!type) {
      throw {
        status: 404,
        message: "No se encontraron tipos",
      };
    }

    return res.status(200).json({ data: type });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error Interno del Servidor",
    });
  }
};

ctrlReports.createType = async (req, res) => {
  const { nombre } = req.body;
  try {
    const [type, created] = await Tipo.findOrCreate({
      where: { nombre },
      defaults: {
        nombre,
      },
    });
    if (!created) {
      throw {
        status: 400,
        message: "El tipo ya existe",
      };
    }
    return res.status(201).json({ message: "Tipo creado con exito!" });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error Interno del Servidor",
    });
  }
};

ctrlReports.destroyType = async (req, res) => {
  const { id } = req.params;
  try {
    const type = await Tipo.findByPk(id);
    if (!type) {
      throw {
        status: 404,
        message: "El tipo no existe",
      };
    }
    await type.destroy();
    return res.status(200).json({ message: "Tipo eliminado con exito!" });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error Interno del Servidor",
    });
  }
};

module.exports = ctrlReports;
