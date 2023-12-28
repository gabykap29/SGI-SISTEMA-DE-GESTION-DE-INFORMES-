const express = require("express");
const router = express.Router();
const obtenerUsername = require("../helpers/username");
const isAutenticated = require("../middlewares/autenticate");
const checkRol = require("../middlewares/checkRol");

router.get(
  "/config",
  isAutenticated,
  checkRol.verificarRolAdmin,
  async (req, res) => {
    try {
      const username = await obtenerUsername(req);
      const rol = req.cookies.rol;
      const uid = req.cookies.uid;
      res.render("tools/index", { username: username, uid, rol });
    } catch (error) {
      console.log("error al obtener el username");
    }
  }
);

module.exports = router;
