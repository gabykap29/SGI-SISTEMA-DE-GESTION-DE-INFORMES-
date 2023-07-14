const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const MAX_FAILED_LOGIN_ATTEMPTS = 3; // Máximo número de intentos fallidos permitidos
const LOCK_TIME = 10 * 60 * 1000; // Duración del bloqueo en milisegundos (10 minutos en este ejemplo)

const isAutenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.SECRET_KEY);
      const user = await Usuario.findOne({ _id: decodificada.id });
      if (!user) {
        return next();
      }

      if (user.loginAttempts >= MAX_FAILED_LOGIN_ATTEMPTS && user.lockUntil > Date.now()) {
        // Usuario bloqueado
        const tiempoRestante = user.lockUntil - Date.now();
        return res.status(401).json({
          message: 'Usuario bloqueado debido a intentos de inicio de sesión fallidos.',
          tiempoRestante: Math.ceil(tiempoRestante / 1000) // Convertir a segundos
        });
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
