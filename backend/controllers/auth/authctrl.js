const bcrypt = require('bcryptjs');
const Usuario = require('../../models/Usuario');
const {generarJWT}=require('../../helpers/generar_jwt');
const authCtrl = {};


authCtrl.login = async (req,res)=>{
    const {username, password} = req.body;

    try {
        const existeUsuario = await Usuario.findOne({ where: { username: username }});
        if(!existeUsuario){
            return res.status(401).json({
                message: 'Verifique el usuario y/o Contraseña'
            });
        }

        if(!existeUsuario.estado){
            return res.status(402).json({
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
        console.log(existeUsuario.id)
        const cookiesOptions ={
            expires:new Date(Date.now()+ process.env.CookiesExpireIn * 24 * 60 * 1000),
            httpOnly: true,
            sameSite: 'strict' // La cookie solo se envía en solicitudes del mismo sitio

        }
        res.cookie('jwt', token, cookiesOptions)
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
authCtrl.closeSesion = async (req,res)=>{
    res.clearCookie('jwt')
    return res.redirect('/login');
}
module.exports = authCtrl;