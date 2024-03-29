const express = require("express");
const router = express.Router();
const ctrlReports = require("../controllers/reports/reports.controller");
const {
  filtrarInformes,
  filtroDepar,
  filtroIncompleted,
} = require("../controllers/reports/filtros");
const isAutenticated = require("../middlewares/autenticate");
const upload = require("../middlewares/multer");
const {
  verificarRolAdmin,
  verificarRolUser,
} = require("../middlewares/checkRol");
const { findDate, findTitle } = require("../controllers/reports/graphics");
const obtenerUsername = require("../helpers/username");
const ctrlFiles = require("../controllers/files/files.controllers");

// Vistas
router.get("/informes/filtros", isAutenticated, async (req, res) => {
  try {
    const username = await obtenerUsername(req);
    const rol = req.cookies.rol;
    const uid = req.cookies.uid;
    res.render("reports/views", { username: username, uid, rol });
  } catch (error) {
    console.log("error al obtener el username");
  }
});

router.get(
  "/informes/create",
  isAutenticated,
  verificarRolUser,
  async (req, res) => {
    try {
      const username = await obtenerUsername(req);
      const uid = req.cookies.uid;
      const rol = req.cookies.rol;
      res.render("reports/create", { username: username, uid, rol });
    } catch (error) {
      console.log("error al obtener el username");
    }
  }
);

router.get("/index", isAutenticated, async (req, res) => {
  try {
    const username = await obtenerUsername(req);
    const rol = req.cookies.rol;
    const uid = req.cookies.uid;
    res.render("reports/index", { username: username, uid, rol });
  } catch (error) {
    console.log("error al obtener el username");
  }
});

router.get("/informes/view/:id", isAutenticated, async (req, res) => {
  try {
    const username = await obtenerUsername(req);
    const rol = req.cookies.rol;
    const uid = req.cookies.uid;
    res.render("reports/view", {
      id: req.params.id,
      username: username,
      uid,
      rol,
    });
  } catch (error) {
    console.log("error al obtener el username");
  }
});
router.get("/informes/:id/print", isAutenticated, (req, res) => {
  res.render("reports/printReport");
});

router.get(
  "/informe/edit/:id",
  isAutenticated,
  verificarRolAdmin,
  async (req, res) => {
    try {
      const username = await obtenerUsername(req);
      const rol = req.cookies.rol;
      const uid = req.cookies.uid;
      res.render("reports/edit", {
        username: username,
        id: req.params.id,
        uid,
        rol,
      });
    } catch (error) {
      console.log("error al obtener el username");
    }
  }
);

router.get(
  "/informes/graficos/departamentos",
  isAutenticated,
  async (req, res) => {
    try {
      const username = await obtenerUsername(req);
      const uid = req.cookies.uid;
      const rol = req.cookies.rol;
      res.render("graphics/forDepar", { username: username, uid, rol });
    } catch (error) {
      console.log("Error al obtener el username del usuario!");
    }
  }
);

router.get("/informes/:id", async (req, res) => {
  try {
    const username = await obtenerUsername(req);
    const uid = req.cookies.uid;
    const rol = req.cookies.rol;
    res.render("reports/views", {
      username: username,
      id: req.params.id,
      uid,
      rol,
    });
  } catch (error) {
    console.log("Error al obtener el username del usuario!");
  }
});

// APIs
router.post("/api/informes/create", isAutenticated, ctrlReports.create);
router.post(
  "/api/informes/:id/imagen",
  isAutenticated,
  verificarRolUser,
  upload.single("rutaImagen"),
  ctrlFiles.create
);
router.get("/api/informe/:id", isAutenticated, ctrlReports.Read);
router.get("/api/informes", isAutenticated, ctrlReports.readsAll);
router.put(
  "/api/informes/edit/:id",
  isAutenticated,
  upload.single("rutaImagen"),
  verificarRolAdmin,
  ctrlReports.update
);
router.put(
  "/api/informes/deleted/:id",
  isAutenticated,
  verificarRolAdmin,
  ctrlReports.deleted
);
router.get("/api/filtrar", isAutenticated, filtrarInformes);
router.get("/api/porDepar", isAutenticated, filtroDepar);
router.post("/api/informes/findDate", findDate);
router.get("/api/informes/forTitle", findTitle);
router.put(
  "/api/informes/complete/:id",
  isAutenticated,
  verificarRolUser,
  ctrlReports.complete
);
router.get("/api/informes/incomplete", isAutenticated, filtroIncompleted);
router.get("/api/informes/tipos", isAutenticated, ctrlReports.getTypeReport);
router.post(
  "/api/informes/tipos/create",
  isAutenticated,
  verificarRolAdmin,
  ctrlReports.createType
);
router.delete(
  "/api/informes/tipos/delete/:id",
  isAutenticated,
  verificarRolAdmin,
  ctrlReports.destroyType
);
module.exports = router;
