const express = require('express');
const router = express.Router();
const ctrlReports = require('../controllers/reports/auth.reports');
const { filtrarInformes, filtroDepar } = require('../controllers/reports/filtros');
const isAutenticated = require('../middlewares/autenticate');
const upload = require('../middlewares/multer');
const {verificarRolAdmin, verificarRolUser} = require('../middlewares/checkRol');
const { findDate, findTitle } = require('../controllers/reports/graphics');
const obtenerUsername = require('../helpers/username');

// Vistas
router.get('/informes/views', isAutenticated , async (req, res) => {
  try {
    const username = await obtenerUsername(req);
    const rol = req.cookies.rol;
    const uid = req.cookies.uid;
    res.render('views',{username:username,uid,rol});
  } catch (error) {
    console.log('error al obtener el username')
  }
});

router.get('/informes/create', isAutenticated, verificarRolUser, async(req, res) => {
  try {
    const username = await obtenerUsername(req);
    const uid = req.cookies.uid;
    const rol = req.cookies.rol;
    res.render('create',{username:username,uid,rol});
  } catch (error) {
    console.log('error al obtener el username')
  }
});

router.get('/index', isAutenticated, async(req, res) => {
  try {
    const username = await obtenerUsername(req);
    const rol = req.cookies.rol;
    const uid = req.cookies.uid;
    res.render('index',{username:username,uid,rol});
  } catch (error) {
    console.log('error al obtener el username')
  }
});

router.get('/informes/view/:id', isAutenticated,async(req, res) => {
  try {
    const username = await obtenerUsername(req);
    const rol = req.cookies.rol;
    const uid = req.cookies.uid;
    res.render('view',{ id: req.params.id ,username:username,uid,rol});
  } catch (error) {
    console.log('error al obtener el username')
  }
});
router.get('/informe/edit/:id', isAutenticated, verificarRolAdmin, async(req, res) => {
  try {
    const username = await obtenerUsername(req);
    const rol = req.cookies.rol;
    const uid = req.cookies.uid;
    res.render('edit',{username:username,id: req.params.id ,uid,rol});
  } catch (error) {
    console.log('error al obtener el username')
  }
});

router.get('/informes/graficos/departamentos', isAutenticated,async(req,res)=>{
  try {
    const username = await obtenerUsername(req);
    const uid = req.cookies.uid;
    const rol = req.cookies.rol;
    res.render('graphics/forDepar' ,{ username:username,uid,rol})
  } catch (error) {
    console.log('Error al obtener el username del usuario!');
  }
 
});




router.get('/informes/graficos/localidades', isAutenticated,async(req,res)=>{
  try {
    const username = await obtenerUsername(req);
    const uid = req.cookies.uid;
    const rol = req.cookies.rol;
    res.render('graphics/forVillages' ,{ username:username,uid,rol})
  } catch (error) {
    console.log('Error al obtener el username del usuario!');
  }
 
});

router.get('/informes/graficos/fecha', isAutenticated,async(req,res)=>{
  try {
    const username = await obtenerUsername(req);
    const uid = req.cookies.uid;
    const rol = req.cookies.rol;
    res.render('graphics/forDate' ,{ username:username,uid,rol})
  } catch (error) {
    console.log('Error al obtener el username del usuario!');
  }
 
});
router.get('/informes/graficos/titulo', isAutenticated,async(req,res)=>{
  try {
    const rol = req.cookies.rol;
    const username = await obtenerUsername(req);
    const uid = req.cookies.uid;
    res.render('graphics/forTitle' ,{ username:username,uid,rol})
  } catch (error) {
    console.log('Error al obtener el username del usuario!');
  }
 
});

router.get('/informes/:id', async (req,res)=>{
  try {
    const username = await obtenerUsername(req);
    const uid = req.cookies.uid;
    const rol = req.cookies.rol;
    res.render('views' ,{ username:username ,id: req.params.id,uid,rol});
  } catch (error) {
    console.log('Error al obtener el username del usuario!');
  }
 
})



// APIs
router.post('/api/informes/create', isAutenticated, upload.array('rutaImagen',5), ctrlReports.create);
router.get('/api/informe/:id', isAutenticated,ctrlReports.Read);
router.get('/api/informes', isAutenticated,ctrlReports.readsAll);
router.put('/api/informes/edit/:id', isAutenticated, upload.single('rutaImagen'),verificarRolAdmin,ctrlReports.update);
router.put('/api/informes/deleted/:id', isAutenticated, verificarRolAdmin,ctrlReports.deleted);
router.get('/api/filtrar', isAutenticated,filtrarInformes);
router.get('/api/porDepar', isAutenticated,filtroDepar);
router.post('/api/informes/findDate',findDate);
router.get('/api/informes/forTitle',findTitle);

module.exports = router;
