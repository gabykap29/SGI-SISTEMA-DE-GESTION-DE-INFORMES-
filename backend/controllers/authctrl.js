const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generarJWT}=require('../helpers/generar_jwt');
const authCtrl = {};


authCtrl.login = async (req,res)=>{
    const {username, password} = req.body;

    try {
        const existeUsuario = await Usuario.findOne({username});
        if(!existeUsuario){
            return res.status(400).json({
                message: 'Verifique el usuario y/o Contraseña'
            });
        }

        if(!existeUsuario.estado){
            return res.status(400).json({
                message:'el usuario se encuentra bloqueado'
            });
        }

        const passwordValido = bcrypt.compareSync(password,existeUsuario.password);
        if(!passwordValido){
            return res.status(400).json({
                message:'Verifique el usuario y/o Contraseña'
            });
        }
        const token = await generarJWT(existeUsuario.id)
        res.json({
            message:'Login Correcto',
            token,
        });


    }catch(error){
        console.log(error);
        res.status(500).json({
            message:'error interno del servidor'
        })
    }

}

module.exports = authCtrl;