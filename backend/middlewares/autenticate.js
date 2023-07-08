const isAuthenticated = async (req, res, next) => {
    // Leer el token del encabezado
    let token = req.header('Authorization');
  
    if (!token) {
      return res.redirect("/login");
    }
  
    // Verificar si el token incluye el prefijo 'Bearer'
    if (token.startsWith('Bearer ')) {
      // Eliminar el prefijo 'Bearer ' del token
      token = token.slice(7);
    }
  
    try {
      // Verificar y decodificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Leer el usuario que corresponde al id
      const user = await User.findByPk(decoded?.id);
  
      // Resto del código...
  
    } catch (error) {
      console.log('catch (error)');
      console.log(error);
      return res.status(401).json({
        message: 'Token inválido',
      });
    }
  };
module.exports = { isAuthenticated };