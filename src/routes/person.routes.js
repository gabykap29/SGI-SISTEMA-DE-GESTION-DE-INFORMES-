const express = require('express');
const router = express.Router();
const isAutenticated = require('../middlewares/autenticate');
const { findDni, create, update, index, findPerson, getAll } = require('../controllers/person/person.controller');
const obtenerUsername = require('../helpers/username');
const { verificarRolUser } = require('../middlewares/checkRol');
const upload = require('../middlewares/multer');

router.get('/personas/buscar', isAutenticated,async(req,res)=>{
  try {
    const username = await obtenerUsername(req);
    const uid = req.cookies.uid;
    const rol = req.cookies.rol;
    res.render('person/index',{username:username,uid,rol});
  } catch (error) {
    console.log('error al obtener el username')
  }
  });



router.get('/ver/persona/:id', isAutenticated,async(req,res)=>{
  try {
    const username = await obtenerUsername(req);
    const uid = req.cookies.uid;
    const rol = req.cookies.rol;
    res.render('person/show',{username:username,uid,rol});
  } catch (error) {
    console.log('error al obtener el username')
  }
  });
  //api
router.post('/api/find/person/:dni',isAutenticated,findDni );
router.get('/api/person/:idPerson',isAutenticated,index)
router.post('/api/informe/:id/persons',isAutenticated,upload.single('rutaImagen'),create);
router.get('/api/persons',isAutenticated,findPerson);
router.get('/api/persons/all',isAutenticated,getAll);

module.exports = router;