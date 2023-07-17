const jwt = require('jsonwebtoken');
const verificarRolAdmin = (req,res,next)=>{
    const token = req.cookies.jwt;

    if(!token){
        return res.status(401).json({message:'No hay token en la petición'});
    }
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        const rol = decoded
        console.log(rol)

        if(rol !== 'Moderate'){
            return res.status(403).json({message: "Acceso Denegado!, se enviará una notificación a los Administradores!"})
        }
        next()
    } catch (error) {
        return res.status(201).json({message: 'Acceso Denegado!, se enviará una notificación a los Administradores!'})
    }
}

module.exports = verificarRolAdmin