const ctrlDepartamento = require("../controllers/departament/departament.controller");
const router = require("express").Router();
const isAutenticated = require("../middlewares/autenticate");
const checkRol = require("../middlewares/checkRol");

//apis
router.get("/api/departaments", isAutenticated, ctrlDepartamento.getAll);
router.post(
    "/api/department/create",
    isAutenticated,
    checkRol.verificarRolAdmin,
    ctrlDepartamento.create
);
router.delete(
    "/api/department/delete/",
    isAutenticated,
    checkRol.verificarRolAdmin,
    ctrlDepartamento.destroy
);

module.exports = router;
