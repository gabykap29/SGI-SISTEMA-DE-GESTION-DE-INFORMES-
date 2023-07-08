ctrlReports = {};
const Report = require('../models/Informe');
const Departamento = require('../models/Departamento');
const Localidad = require('../models/Localidad');
const Tipo = require('../models/Tipo');
// Crear un Informe


ctrlReports.create = async (req, res) => {
    const { Departamento_idDepartamento, Localidad_idLocalidad, Tipo_idTipo, Titulo, Fecha, RutaImagen, Informe } = req.body;

    console.log('req.body');
    console.log(req.body);

    try {
        const informe = await Report.create({
            Departamento_idDepartamento,
            Localidad_idLocalidad,
            Tipo_idTipo,
            Titulo,
            Fecha,
            RutaImagen,
            Informe
        });

        if(!informe){
                 throw {
                message: 'error al crear el Informe'
                };
            }

        return res.json(informe);
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
};



//Obtener un INFORME

ctrlReports.Read = async(req,res)=>{
    const {id} = req.params;
    try{
        const informe = await Report.findByPk(id);

        if(!informe){
            throw({
                status: 404,
                message:'El informe no existe!'
            });
        }
        return res.json(informe)
    }catch(error){
        console.log(error);
        return res.status(error.status|| 500).json({
            message: error.message || 'Error Interno del Servidor'
        });
    }
}

ctrlReports.readsAll = async (req, res)=>{
    try{
        const informes = await Report.findAll({
            where: {
                estado:true,
            }
        });
        if(!informes){
            thow({
                status:404,
                message:'La base de datos está vacía'
            })
        }
        return res.status(200).json(informes);
    }catch(error){
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'error al obtener los informes'
        })
    }
}
ctrlReports.update = async(req,res)=>{
    const {id}=req.params;
    const {
        departamento,
        localidad, 
        tipo, 
        titulo, 
        fecha, 
        rutaImagen, 
        informe,} = req.body;

    try{
        const informeUpdate = await Report.update({
            departamento,
            localidad, 
            tipo, 
            titulo, 
            fecha, 
            rutaImagen, 
            informe,
        },{
            where:{id}
        });
        if (!informeUpdate){
           throw({
            status:400,
            message: "error al actualizar el Informe"
           });
        }
        return res.json({
            message: 'Informe actualizado correctamente',
            informeUpdate
        });
    }catch(error){
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'error al actualzar'
        })
    }
}
ctrlReports.deleted = async(req,res)=>{
    const {id} = req.params;
    try{
        const informeDeleted = Report.update({
            estado:false
        },{
            where:{
                id,
                estado:true,
            }
        })
        if (!informeDeleted){
            throw({
                status:400,
                message: 'Error al eliminar el Informe'
            })
        }
        return res.json({
            message: 'Informe eliminado con éxito!'
        });
    }catch(error){
        console.log(error);
        return error.status || 'Error interno del Servidor'
    }
}

module.exports = ctrlReports;