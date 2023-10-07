const express = require('express');
const router = express.Router();
const isAutenticated = require('../middlewares/autenticate');
const { findDni, create, update } = require('../controllers/person/auth.person');
const obtenerUsername = require('../helpers/username');
const { verificarRolUser } = require('../middlewares/checkRol');

router.get('/ver/personas', isAutenticated,async(req,res)=>{
  try {
    const username = await obtenerUsername(req)
    res.render('person/index',{username:username});
  } catch (error) {
    console.log('error al obtener el username')
  }
  });
  //api
router.post('/api/find/person',isAutenticated,findDni );
router.post('/api/informe/:id/persons',isAutenticated,create);

module.exports = router;