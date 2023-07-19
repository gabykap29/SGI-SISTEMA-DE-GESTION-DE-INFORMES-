const jwt = require('jsonwebtoken');
const checkRol = {};
checkRol.verificarRolAdmin = (req,res,next)=>{
    const token = req.cookies.jwt;

    if(!token){
        return res.status(401).json({message:'No hay token en la petición'});
    }
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        const rol = decoded.rol

        if(rol != 'Moderate'){
            res.redirect('/login');
            return res.status(403).json({message: "Acceso Denegado!, se enviará una notificación a los Administradores!"})
        }
        next()
    } catch (error) {
        res.redirect('/login');
        return res.status(401).json({message: 'Acceso Denegado!, se enviará una notificación a los Administradores!'})
    }
}
checkRol.verificarRolUser = (req,res,next)=>{
    const token = req.cookies.jwt;

    if(!token){
        res.redirect('/login');
        return res.status(401).json({message:'No hay token en la petición'});
    }
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        const rol = decoded.rol
        console.log(rol)

        if(rol != 'Moderate' & rol != 'User'){
            res.redirect('/login');
            return res.status(403).json({message: "Acceso Denegado!, se enviará una notificación a los Administradores!"})
        }
        next()
    } catch (error) {
        res.redirect('/login');
        return res.status(401).json({message: 'Acceso Denegado!, se enviará una notificación a los Administradores!'})
    }
}



module.exports = checkRol;