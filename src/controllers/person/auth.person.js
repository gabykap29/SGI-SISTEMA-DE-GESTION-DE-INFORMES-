const crtlPerson = {};
const jwt = require('jsonwebtoken');
const Person = require('../../models/Person');
const Usuario = require('../../models/Usuario');
const Informe = require('../../models/Informe');

//BUscar personas
crtlPerson.findDni = async (req,res)=>{
    const {dni, firstName,lastName} = req.body;

    const token = req.cookies.jwt;

    if(!token){
      return res.status(401).json({message:'no hay token en la petición'});
    }
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
        return res.json(person);

    } catch (error) {
        console.log(error);
        return res.json({status:500, message:'Error interno en el servidor'})
    }
}
module.exports = crtlPerson;