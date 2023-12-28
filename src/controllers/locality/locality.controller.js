const Localidad = require("../../models/Localidad");
const Departamento = require("../../models/Departamento");
const ctrlLocalidad = {};

ctrlLocalidad.getAll = async (req, res) => {
  try {
    const Localidades = await Localidad.findAll({
      include: {
        model: Departamento,
        attributes: ["idDepartamento", "nombre"],
        as: "Departamento",
      },
    });
    if (!Localidades) {
      throw {
        status: 400,
        message: "No se encontraron Localidades",
      };
    }
    return res.json({ Localidades });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al obtener los Localidades",
    });
  }
};
ctrlLocalidad.create = async (req, res) => {
  const { locality, department } = req.body;
  console.log(req.body);
  try {
    const verifyLocality = await Localidad.findOne({
      where: {
        nombre: locality,
      },
    });

    if (verifyLocality) {
      return res
        .status(400)
        .json({ message: "La localidad ya se encuentra agregada!" });
    }

    const newLocality = await Localidad.create({
      nombre: locality,
      Departamento_idDepartamento: department,
    });
    console.log(newLocality);
    return res
      .status(201)
      .json({ message: "Localidad agregada correctamente!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor! Comuniquese con un administrador!",
    });
  }
};

ctrlLocalidad.destroy = async (req, res) => {
  const { idLocality } = req.query;
  try {
    const verifyLocality = await Localidad.findByPk(idLocality);
    if (!verifyLocality) {
      return res.status(500).json({
        message: "La localidad ingresada no existe!",
      });
    }
    const destroy = await Localidad.destroy({
      where: {
        idLocalidad: idLocality,
      },
    });
    return res.status(200).json({
      message: "Eliminado con éxito!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor! comuniquese con un Administrador!",
    });
  }
};

module.exports = ctrlLocalidad;
