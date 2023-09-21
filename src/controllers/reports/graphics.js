const { sequelize } = require('../../db');
const Informe = require('../../models/Informe');
const Report = require('../../models/Informe');
const { Op } = require('sequelize');
const crtlGraphics = {};

//por fecha
crtlGraphics.findDate= async(req,res)=> {
    const {fechaInicio, fechaFinal, tipo} = req.body;
    const token = req.cookies.jwt;
    // if(!token){
    //     return res.status(401).json({message:'No se encuentra autorizado para solicitar recursos '})
    // }
    try {
        const reports = await Report.findAll({
            attributes:[
                'fecha',
                'tipo_idTipo',
                [sequelize.fn('COUNT', sequelize.col('tipo_idTipo')),'count']
            ],
            where:{
                fecha:{
                    [Op.between]:[fechaInicio,fechaFinal],
                }
            }, group:['fecha','tipo_idTipo']
        })
        if(!reports){
            return res.status(404).json({message:'no hay informes cargados en las fecha especificadas!'})
        }
        return res.json(reports);
    } catch (error) {
        console.log(error)
    }

};
crtlGraphics.findTitle = async (req,res)=>{
    try {
        const title = await Informe.findAll({
           attributes:['Titulo',[sequelize.fn('COUNT',sequelize.col('Titulo')),'count']],
           group:['Titulo'],
           order:[[sequelize.literal('count'),'DESC']],
           limit:6 
        });
        if(!title){
            throw({
                message:'error al obtener los informes por titulo!'
            })
        }
        return res.json({title});
    } catch (error) {
        console.log(error);
    }
}
module.exports = crtlGraphics;
