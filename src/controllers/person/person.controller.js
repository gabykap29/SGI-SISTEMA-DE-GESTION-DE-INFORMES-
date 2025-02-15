const crtlPerson = {};
const {
  Person,
  Informe,
  Tipo,
  Departamento,
  Localidad,
} = require("../../models/asossiations");
const ImgPerson = require("../../models/ImgPerson");
const { Op } = require("sequelize");
//BUscar personas
crtlPerson.getAll = async (req, res) => {
  try {
    const persons = await Person.findAll({
      limit: 4,
      order: [["idPerson", "DESC"]],
      include: [
        {
          model: ImgPerson,
          as: "ImgPersons",
          attributes: ["rutaImagen"],
        },
      ],
    });

    if (!persons) {
      return res
        .status(404)
        .json({ message: "no hay personas cargadas en base de datos" });
    }

    return res.status(200).json(persons);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor!" });
  }
};

crtlPerson.findPerson = async (req, res) => {
  const filtro = {};

  try {
    const { firstName, lastName, dni } = req.query;

    if (firstName) {
      filtro.firstName = {
        [Op.like]: `%${firstName}%`,
      };
    }
    if (lastName) {
      filtro.lastName = {
        [Op.like]: `%${lastName}%`,
      };
    }
    if (dni) {
      filtro.dni = {
        [Op.like]: `%${dni}%`,
      };
    }
    const personList = await Person.findAll({
      where: filtro,
    });

    res.json(personList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor!" });
  }
};

crtlPerson.findDni = async (req, res) => {
  const { dni } = req.params;
  try {
    const person = await Person.findOne({
      where: {
        dni: dni,
      },
    });

    if (!person) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    return res.status(200).json(person);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor!" });
  }
};

crtlPerson.create = async (req, res) => {
  const {
    dni,
    firstName,
    lastName,
    address,
    description,
    clase,
    locality,
    province,
    facebook,
    instagram,
    phone,
    work,
    mail,
  } = req.body;
  const { id } = req.params;

  try {
    if (req.file) {
      const { rutaImagen } = req.file;
    }
    const informe = await Informe.findByPk(id);

    if (!dni && !lastName && !firstName) {
      throw {
        status: 400,
        message: "El campo dni, nombre y apellido son obligatorios!",
      };
    }

    let comprobarDni = parseInt(dni);
    if (!comprobarDni) {
      return res.status(400).json({
        message: "El campo dni debe ser un número, evite usar puntos!",
      });
    }

    const [person, created] = await Person.findOrCreate({
      where: { dni },
      defaults: {
        firstName,
        lastName,
        address,
        description,
        locality,
        province,
        clase,
        facebook,
        instagram,
        phone,
        work,
        mail,
      },
    });
    if (req.file && created) {
      const rutaImagen = `/uploads/${req.file.filename}`;
      const imgPerson = await ImgPerson.create({
        rutaImagen: rutaImagen,
        personId: person.idPerson,
      });
    }
    await informe.addInformePerson(person);
    return res.status(201).json({ message: "Persona creadas con éxito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor!" });
  }
};
crtlPerson.index = async (req, res) => {
  const { idPerson } = req.params;

  try {
    const person = await Person.findOne({
      where: {
        idPerson: idPerson,
      },
      include: [
        {
          model: Informe,
          as: "informePersons",
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
        },
        {
          model: ImgPerson,
          as: "ImgPersons",
        },
      ],
    });

    if (!person) {
      return res.status(401).json({ message: "no hay token en la petición" });
    }

    return res.status(201).json(person);
  } catch (error) {
    console.error(error);
    return res.json({ status: 500, message: "Error interno en el servidor" });
  }
};

module.exports = crtlPerson;
