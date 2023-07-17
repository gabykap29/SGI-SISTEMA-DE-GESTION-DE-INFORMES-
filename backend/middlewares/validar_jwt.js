const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const validarJWT = async (req, res, next) =>{
    const token = req.headers('jwt');

    if(!token){
        return res.status(401).json({
            message: 'No hay token en la petición'
        });
    }


    try{
        const {id} = jwt.verify(token, process.env.SECRET_KEY);

        const usuario = await Usuario.findByPk(id);

        if(!Usuario){
            return res.status(401).json({
                message: 'Token no válido - se ha enviado una notificación al área de Sistemas '
            });
        }

        if(!usuario.estado){
            return res.status(401).json({
                message: 'Token no válido - usuario no habilitado'
            });
        }
        res.usuario = usuario;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({
            message: 'Token no válido - se ha enviado una notificación al área de Sistemas'
        });
    }

}

module.exports = {
    validarJWT,
}