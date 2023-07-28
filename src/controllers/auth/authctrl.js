// controllers/auth/authCtrl.js
const bcrypt = require('bcryptjs');
const Usuario = require('../../models/Usuario');
const { generarJWT } = require('../../helpers/generar_jwt');
const authCtrl = {};
const MAX_FAILED_LOGIN_ATTEMPTS = 3;
const LOCK_TIME = 10 * 60 * 1000;
var intentos = 0;

authCtrl.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({ where: { username: username } });
    if (!usuarioEncontrado) {
      intentos = 0; // Restablecer intentos si no se encontró el usuario
      return res.status(401).json({
        message: 'Verifique el usuario y/o Contraseña'
      });
    }
    // Verificar si el usuario está bloqueado
    if (usuarioEncontrado.estado === false) {
      return res.status(402).json({
        message: 'El usuario se encuentra bloqueado'
      });
    }

    const passwordValido = bcrypt.compareSync(password, usuarioEncontrado.password);
    if (!passwordValido) {
      // Incrementar el número de intentos fallidos y actualizar el tiempo de bloqueo si se supera el límite
      intentos++;
      if (intentos >= MAX_FAILED_LOGIN_ATTEMPTS) {
        await Usuario.update({
          loginAttempts: intentos,
          lockUntil: Date.now() + LOCK_TIME,
          estado: 0 // Cambiar el estado del usuario a bloqueado (0)
        }, {
          where: { id: usuarioEncontrado.id }
        });

        return res.status(401).json({
          message: 'Usuario bloqueado debido a intentos de inicio de sesión fallidos.',
          tiempoRestante: Math.ceil(LOCK_TIME / 1000) // Convertir a segundos
        });
      }

      // Restablecer el tiempo de bloqueo si no se ha superado el límite
      await Usuario.update({
        loginAttempts: intentos
      }, {
        where: { id: usuarioEncontrado.id }
      });

      return res.status(400).json({
        message: 'Verifique el usuario y/o Contraseña'
      });
    }

    // Restablecer el contador de intentos fallidos y el tiempo de bloqueo si el inicio de sesión es exitoso
    intentos = 0;
    await Usuario.update({
      loginAttempts: 0,
      lockUntil: null,
    }, {
      where: { id: usuarioEncontrado.id }
    });

    // Resto del código para el inicio de sesión exitoso y la generación del token...
    const token = await generarJWT(usuarioEncontrado.id, usuarioEncontrado.rol);
    const cookiesOptions = {
      expires: new Date(Date.now() + process.env.CookiesExpireIn * 24 * 60 * 1000),
      httpOnly: true,
      sameSite: 'strict'
    };
    res.cookie('jwt', token, cookiesOptions);
    res.cookie('rol', usuarioEncontrado.rol, cookiesOptions);
    res.json({
      message: 'Login Correcto',
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

authCtrl.closeSesion = async (req, res) => {
  res.clearCookie('jwt');
  res.clearCookie('rol');
  return res.redirect('/login');
};

module.exports = authCtrl;
