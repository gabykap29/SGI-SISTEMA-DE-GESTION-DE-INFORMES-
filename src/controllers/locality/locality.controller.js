const Localidad = require('../../models/Localidad');
const Departamento = require('../../models/Departamento');
const ctrlLocalidad = {};

ctrlLocalidad.getAll = async (req, res) => {
    try {
        const Localidades = await Localidad.findAll(
            {
                include: {
                    model: Departamento,
                    attributes: ['idDepartamento', 'nombre'],
                    as:'Departamento'
                }
            }
        );
        if(!Localidades){
            throw({
                status:400,
                message:'No se encontraron Localidades'
            });
        };
        return res.json({ Localidades
        });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al obtener los Localidades'
        });
    }
};

module.exports = ctrlLocalidad;