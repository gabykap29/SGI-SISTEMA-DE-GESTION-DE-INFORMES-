const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');



const isAutenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.SECRET_KEY);
      const user = await Usuario.findOne({ _id: decodificada.id });
      if (!user) {
        return next();
      }

      req.user = user;
      return next();
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect('/login');
  }
};

module.exports = isAutenticated;
