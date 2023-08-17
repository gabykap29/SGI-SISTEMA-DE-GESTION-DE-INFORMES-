const crtlPerson = {};
const jwt = require('jsonwebtoken');
const Person = require('../../models/Person');
const Usuario = require('../../models/Usuario');
const Informe = require('../../models/Informe');

//BUscar personas
crtlPerson.findDni = async (req,res)=>{
    const {dni, firstName,lastName} = req.body;


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
        if(!person){
            return res.json('No existe la persona en la base de datos')
        }
        return res.json(person);

    } catch (error) {
        console.log(error);
        return res.json({status:500, message:'Error interno en el servidor'})
    }
}
module.exports = crtlPerson;