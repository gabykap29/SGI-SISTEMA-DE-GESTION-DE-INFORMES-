const Departamento = require('../../models/Departamento');
const Informe = require('../../models/Informe');
const { Op } = require('sequelize');

// Controlador para filtrar Informes
const filtrarInformes = async (req, res) => {
  try {
    const { departamentoId, localidadId, fechaInicio, fechaFinal, tipo, titulo, informe } = req.query;

    // Construir el objeto de filtro dinámicamente
    const filtro = {};

    if (departamentoId) {
      filtro.Departamento_idDepartamento = departamentoId;
    }
    if (localidadId) {
      filtro.Localidad_idLocalidad = localidadId;
    }
    if (fechaInicio) {
      filtro.Fecha = {
        [Op.gte]: fechaInicio
      };
    }
    if (tipo) {
      filtro.Tipo_idTipo = tipo;
    }
    if (fechaFinal) {
      filtro.Fecha = {
        ...filtro.Fecha,
        [Op.lte]: fechaFinal
      };
    }
    if (titulo) {
      filtro.Titulo = {
        [Op.like]: `%${titulo}%`
      };
    }
    if (informe) {
      filtro.Informe = {
        [Op.like]: `%${informe}%`
      };
    }

    // Realizar la consulta con los filtros
    const informes = await Informe.findAll({
      where: filtro,
    });

    res.json(informes);
  } catch (error) {
    console.error('Error al filtrar Informes:', error);
    res.status(500).json({ error: 'Error al filtrar Informes' });
  }
};
const filtroDepar = async (req, res) => {

  try {
    const departamentos = await Departamento.findAll({
      include: [
        {
          model: Informe,
          as: 'Informes',
        },
      ],
    });

    const informesTotales = [];
    const cantidadInformes = [];

    for (const departamento of departamentos) {
      const informesDepartamento = departamento.Informes.map((informe) => {
        return {
          idInforme: informe.idInforme,
          Localidad_idLocalidad: informe.Localidad_idLocalidad,
          Fecha: informe.Fecha,
          Titulo: informe.Titulo,
          Informe: informe.Informe,
        };
      });
      cantidadInformes.push({
        Departamento: departamento.idDepartamento,
        CantidadInformes: informesDepartamento.length,
    })
      informesTotales.push({
        Departamento: departamento.idDepartamento,
        Informes: informesDepartamento,
      });
    }

    res.json({
      cantidadInformes:cantidadInformes,
      informes: informesTotales,
      totalDepartamentos: departamentos.length,
    });
  } catch (error) {
    console.error('Error al obtener los informes filtrados por Departamento:', error);
    res.status(500).json({ error: 'Error al obtener los informes filtrados por Departamento' });
  }
};


module.exports = {
  filtrarInformes,
  filtroDepar,
};