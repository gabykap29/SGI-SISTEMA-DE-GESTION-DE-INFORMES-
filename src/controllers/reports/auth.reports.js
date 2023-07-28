ctrlReports = {};
const Report = require('../../models/Informe');
const Departamento = require('../../models/Departamento');
const Localidad = require('../../models/Localidad');
const Tipo = require('../../models/Tipo');
// Crear un Informe

ctrlReports.create = async (req, res) => {
    const { Departamento_idDepartamento, Localidad_idLocalidad, Tipo_idTipo, Titulo, Fecha,Observaciones ,Informe } = req.body;
  
    try {
      
      let rutaImagen  // Variable para almacenar la ruta de la imagen
    
      if (req.file) {
        // Si se ha cargado una imagen, obtener la ruta relativa de la imagen
        rutaImagen =  req.file.filename;
      }
    
      const informe = await Report.create({
        Departamento_idDepartamento,
        Localidad_idLocalidad,
        Tipo_idTipo,
        Titulo,
        Fecha,
        RutaImagen: rutaImagen,
        Observaciones,   // Asignar la ruta de la imagen a la propiedad RutaImagen
        Informe,
      });
      if (!Departamento_idDepartamento|| !Localidad_idLocalidad || !Tipo_idTipo || !Titulo || !Fecha || !Informe){
        throw {
          mesagge: 'Favor, verifique todos los campos esten completos.'
        };
      }
    
      return res.json(informe);
    } catch (error) {
      console.error(error);
      return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }};



//Obtener un INFORME

ctrlReports.Read = async (req, res) => {
    const { id } = req.params;
    try {
      const informe = await Report.findByPk(id);
  
      if (!informe) {
        throw {
          status: 404,
          message: 'El informe no existe!'
        };
      }
  
      // Obtener la ruta de la imagen si existe
      let rutaImagen = '';
      if (informe.RutaImagen) {
        rutaImagen = informe.RutaImagen;
      }
  
      // Crear un nuevo objeto de respuesta con la ruta de la imagen
      const informeConImagen = {
        ...informe.toJSON(),
        RutaImagen: rutaImagen
      };
  
      return res.json(informeConImagen);
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        message: error.message || 'Error Interno del Servidor'
      });
    }
  };

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
    const {idInforme}=req.params;
    const {
        Departamento_idDepartamento,
        Localidad_idLocalidad,
        Tipo_idTipo,
        Titulo,
        Fecha,Observaciones,
        Informe} = req.body;
        let rutaImagen  // Variable para almacenar la ruta de la imagen
    
        if (req.file) {
          // Si se ha cargado una imagen, obtener la ruta relativa de la imagen
          rutaImagen =  req.file.filename;
        }
    try{
        const informeUpdate = await Report.update({
            Departamento_idDepartamento,
            Localidad_idLocalidad,
            Tipo_idTipo,
            Titulo,
            Fecha,Observaciones,
            RutaImagen: rutaImagen,
            Informe,
        },{
            where:{
                idInforme:req.params.id,
            }
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
ctrlReports.deleted = async (req, res) => {
  const { id } = req.params;
  const idInforme = id;
  try {
    const informeDeleted = await Report.update(
      {
        estado: false
      },
      {
        where: {
          idInforme,
          estado: true
        }
      }
    );
    if (informeDeleted[0] === 0) {
      throw {
        status: 400,
        message: 'Error al eliminar el Informe'
      };
    }
    return res.json({
      message: 'Informe eliminado con éxito!'
    });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      error: error.message || 'Error interno del servidor'
    });
  }
};

module.exports = ctrlReports;
