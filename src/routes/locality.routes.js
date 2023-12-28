const ctrlLocalidad = require("../controllers/locality/locality.controller");
const router = require("express").Router();
const isAutenticated = require("../middlewares/autenticate");
const checkRol = require("../middlewares/checkRol");

//APIS
router.get("/api/localities", isAutenticated, ctrlLocalidad.getAll);
router.post(
  "/api/localities/create",
  isAutenticated,
  checkRol.verificarRolAdmin,
  ctrlLocalidad.create
);
router.delete(
  "/api/localities/delete/",
  isAutenticated,
  checkRol.verificarRolAdmin,
  ctrlLocalidad.destroy
);
module.exports = router;
