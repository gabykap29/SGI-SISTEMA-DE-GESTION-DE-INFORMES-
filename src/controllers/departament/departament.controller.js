const Departamento = require('../../models/Departamento');

const ctrlDepartamento = {};

ctrlDepartamento.getAll = async (req, res) => {
    try {
        const Departamentos = await Departamento.findAll();
        if(!Departamentos){
            throw({
                status:400,
                message:'No se encontraron Departamentos'
            });
        };
        return res.json({
            message: 'Departamentos obtenidos correctamente',
            data: Departamentos
        });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al obtener los Departamentos'
        });
    }
};

module.exports = ctrlDepartamento;
