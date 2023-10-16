const ctrlReports = {};
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/Usuario')
const{Person, Informe, Files,Departamento,Localidad,Tipo}= require('../../models/asossiations')

// Crear un Informe

ctrlReports.create = async (req, res) => {
    const { Departamento_idDepartamento, Localidad_idLocalidad, Titulo,
            Fecha,Observaciones ,informe} = req.body;
    let {Tipo_idTipo} = req.body;

//---------Se pide el token por si hacen peticiones directamente a las rutas ----------------------
    const token = req.cookies.jwt;
    if(!token){
      return res.status(401).json({message:'no hay token en la petición'});
    }

    try {
      //obtener id de usuario
      const decoded = jwt.verify(token,process.env.SECRET_KEY);
      const id = decoded.id
      let rutaImagen =[];  // Variable para almacenar la ruta de la imagen

      //Si el usuario ingresa un tipo personalizado y 
      if(Tipo_idTipo.length > 2){
        const [tipo, created] = await Tipo.findOrCreate({
          where:{nombre: Tipo_idTipo},
          defaults:{
            nombre: Tipo_idTipo
          }
        });
        Tipo_idTipo = tipo.idTipo;
      };

      const newInforme = await Informe.create({
        Departamento_idDepartamento,
        Localidad_idLocalidad,
        Tipo_idTipo,
        Titulo,
        Fecha,
        Observaciones,   // Asignar la ruta de la imagen a la propiedad RutaImagen
        Informe: informe,
        id_IdUser:id,
      });
      if (!Departamento_idDepartamento|| !Localidad_idLocalidad || !Tipo_idTipo || !Titulo || !Fecha || !informe){
        throw {
          message: 'Favor, verifique todos los campos esten completos.'
        };
      }
      return res.json(newInforme);
    }catch (error) {
      console.error(error);
      return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }};

//Obtener un INFORME

ctrlReports.Read = async (req, res) => {
    const { id } = req.params;
    try {
      const informe = await Informe.findOne(
        {
            where:{ 
            idInforme:id, 
        },
        include:[{
            model:Person,
            as:'informePersons'
        },{
          model:Tipo,
          as:'Informes'
        },{
          model:Files,
          as:'Files'
        }
      ]
    }
    )
    const idUser = informe.id_IdUser;
      const usuario = await Usuario.findByPk(idUser)
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
        RutaImagen: rutaImagen,
        usuario: usuario.username
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
        const informes = await Informe.findAll({
            where: {
                estado:true,
            },include:[{
              model:Tipo,
              as:'Informes'
            }],
          limit:20,
          order: [['createdAt', 'DESC']],
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
    const token = req.cookies.jwt;
    const {idInforme}=req.params;
    const {
        Departamento_idDepartamento,
        Localidad_idLocalidad,
        Tipo_idTipo,
        Titulo,
        Fecha,Observaciones,
        informe} = req.body;
        let rutaImagen;  // Variable para almacenar la ruta de la imagen
          //obtener id de usuario

        if (req.file) {
          // Si se ha cargado una imagen, obtener la ruta relativa de la imagen
          rutaImagen =  req.file.filename;
        }
    try{
      const decoded = jwt.verify(token,process.env.SECRET_KEY);
      const id = decoded.id
        const informeUpdate = await Informe.update({
            Departamento_idDepartamento,
            Localidad_idLocalidad,
            Tipo_idTipo,
            Titulo,
            Fecha,Observaciones,
            RutaImagen: rutaImagen,
            id_IdUser:id,
            Informe: informe,
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
    const informeDeleted = await Informe.update(
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
