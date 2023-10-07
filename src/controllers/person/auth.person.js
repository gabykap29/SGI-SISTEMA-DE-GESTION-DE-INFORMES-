const crtlPerson = {};
const Person = require('../../models/Person');
const Informe = require('../../models/Informe');

//BUscar personas
crtlPerson.findDni = async (req,res)=>{
    const {dni} = req.body;

    try {
        const person = await Person.findOne(
            {
                where:{ 
                dni, 
            },
            include:{
                model:Informe,
                as:'informePersons'
            }
        }
        )
        if (!person){
            return res.status(401).json({message:'no hay token en la petición'});
          }
        return res.status(201).json(person);

    } catch (error) {
        console.log(error);
        return res.json({status:500, message:'Error interno en el servidor'})
    }
};

crtlPerson.create = async (req,res)=>{
    console.log(req.body);
    const {dni,
        firstName,
        lastName,
        address,
        description,
        fechaNac,} = req.body;
        const {id} = req.params;

        try {
            const informe = await Informe.findByPk(id);

            if(!dni && !lastName && !firstName){
                throw({
                    status:400,
                    message:'El campo dni, nombre y apellido son obligatorios!'
                })
            };
            let comprobarDni = parseInt(dni);
            if(!comprobarDni){
                return res.status(400).json({message:'El campo dni debe ser un número, evite usar puntos!'});
            }

            const [person, created] = await Person.findOrCreate({
                where: { dni },
                defaults: {
                    firstName,
                    lastName,
                    address,
                    description,
                    fechaNac
                }
            });
            console.log(person);
            await informe.addInformePerson(person);
            return res.status(201).json({message:'Persona creadas con éxito'});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"Error interno del servidor!"});
        }
}


module.exports = crtlPerson;