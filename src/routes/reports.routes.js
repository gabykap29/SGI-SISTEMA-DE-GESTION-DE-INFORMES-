const express = require('express');
const router = express.Router();
const ctrlReports = require('../controllers/reports/auth.reports');
const { filtrarInformes, filtroDepar } = require('../controllers/reports/filtros');
const isAutenticated = require('../middlewares/autenticate');
const upload = require('../middlewares/multer');
const {verificarRolAdmin, verificarRolUser} = require('../middlewares/checkRol');
const { findDate, findTitle } = require('../controllers/reports/graphics');


// Vistas
router.get('/informes/views', isAutenticated ,(req, res) => {
  res.render('views');
});
router.get('/informes/create', isAutenticated, verificarRolUser,(req, res) => {
  res.render('create');
});
router.get('/index', isAutenticated,(req, res) => {
  res.render('index');
});
router.get('/informes/view/:id', isAutenticated,(req, res) => {
  res.render('view', { id: req.params.id });
});
router.get('/informe/edit/:id', isAutenticated, verificarRolAdmin,(req, res) => {
  res.render('edit', { id: req.params.id });
});

router.get('/informes/graficos',isAutenticated,verificarRolAdmin,(req,res)=>{
  res.render('graphics/graphics')
})
  // Resto de las rutas


// APIs
router.post('/api/informes/create', isAutenticated, upload.single('rutaImagen'), ctrlReports.create);
router.get('/api/informe/:id', isAutenticated,ctrlReports.Read);
router.get('/api/informes', isAutenticated,ctrlReports.readsAll);
router.put('/api/informes/edit/:id', isAutenticated, upload.single('rutaImagen'),verificarRolAdmin,ctrlReports.update);
router.put('/api/informes/deleted/:id', isAutenticated, verificarRolAdmin,ctrlReports.deleted);
router.get('/api/filtrar', isAutenticated,filtrarInformes);
router.get('/api/porDepar', isAutenticated,filtroDepar);
router.post('/api/informes/findDate',findDate);
router.get('/api/informes/forTitle',findTitle);

module.exports = router;
