const Departamento = require("../../models/Departamento");

const ctrlDepartamento = {};

ctrlDepartamento.getAll = async (req, res) => {
  try {
    const Departamentos = await Departamento.findAll();
    if (!Departamentos) {
      throw {
        status: 400,
        message: "No se encontraron Departamentos",
      };
    }
    return res.json({
      message: "Departamentos obtenidos correctamente",
      data: Departamentos,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al obtener los Departamentos",
    });
  }
};
ctrlDepartamento.create = async (req, res) => {
  const { nombre } = req.body;

  try {
    const verifyDepartment = await Departamento.findOne({
      where: {
        nombre: nombre,
      },
    });

    if (verifyDepartment) {
      return res.status(400).json({
        message: "El Departamento ya existe!",
      });
    }

    const newDepartment = Departamento.create({
      nombre,
    });

    return res.status(201).json({
      message: "Departamento creado con éxito!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor!, comuniquese con un Administrador",
    });
  }
};

ctrlDepartamento.destroy = async (req, res) => {
  const { idDepartment } = req.query;
  console.log(req.query);

  try {
    const verifyDepartment = await Departamento.findByPk(idDepartment);

    if (!verifyDepartment) {
      return res.status(404).json({ message: "El departamento no existe!" });
    }

    const destroy = Departamento.destroy({
      where: {
        idDepartamento: idDepartment,
      },
    });
    return res.status(200).json({ message: "Departamento borrado!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        message:
          "Error interno del servidor! comuniquese con un Administrador!",
      });
  }
};

module.exports = ctrlDepartamento;
