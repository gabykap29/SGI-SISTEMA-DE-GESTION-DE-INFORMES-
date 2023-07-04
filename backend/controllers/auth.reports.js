ctrlReports = {};
const Informe = require('../models/Informe');
const Departamento = require('../models/Departamento');
const Localidad = require('../models/Localidad');
const Tipo = require('../models/Tipo');
// Crear un Informe
ctrlReports.create = async (req, res)=>{
    const {departamento, localidad, tipo, titulo, fecha, rutaImagen, informe} = req.body;

    try{
        const nuevoInforme = await Informe.create({
            departamento,
            localidad, 
            tipo, 
            titulo, 
            fecha, 
            rutaImagen, 
            informe,
        });
        if(!nuevoInforme){
            throw {
                message: 'error al crear el Informe'
            };
        }
        res.status(201).json(nuevoInforme);
    }catch(error){
        console.log(error);
        return res.status(error.status|| 500).json({
            message: error.message || 'Error Interno del Servidor'
        });
    }
};
//Obtener un INFORME

ctrlReports.Read = async(req,res)=>{
    const {id} = req.params;
    try{
        const informe = await Informe.findByPk(id);

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
        const informes = await Informe.findAll({
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
        const informeUpdate = await Informe.update({
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
        const informeDeleted = Informe.update({
            estado:true
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