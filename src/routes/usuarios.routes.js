const express = require('express');
const router = express.Router();
const isAutenticated = require('../middlewares/autenticate');
const obtenerUsername = require('../helpers/username');

const {
    create,
    usersRead,
    userRead,
    userUpdate,
    userDelete
} = require('../controllers/auth/user');

const {verificarRolAdmin, verificarRolUser} = require('../middlewares/checkRol');


router.get('/usuarios', isAutenticated,verificarRolAdmin,async(req,res)=>{
    try {
        const username = await obtenerUsername(req)
        const rol = req.cookies.rol;
        const uid = req.cookies.uid;
        res.render('users/index',{username:username, uid,rol});
      } catch (error) {
        console.log('error al obtener el username')
      }
});

router.get('/usuarios/crear',isAutenticated,verificarRolAdmin,async(req,res)=>{
    try {
        const username = await obtenerUsername(req);
        const rol = req.cookies.rol;
        const uid = req.cookies.uid;
        res.render('users/create',{username:username,uid,rol});
      } catch (error) {
        console.log('error al obtener el username')
      }
});

router.get('/usuario/edit/:id',isAutenticated, verificarRolAdmin,async(req,res)=>{
    try {
        const username = await obtenerUsername(req);
        const rol = req.cookies.rol;
        const uid = req.cookies.uid;
        res.render(('users/edit'),{ id: req.params.id ,username:username,uid,rol});
      } catch (error) {
        console.log('error al obtener el username')
      }
});
router.get('/usuarios/:id/show',isAutenticated, async(req,res)=>{
  try {
    const rol = req.cookies.rol;
    const username = await obtenerUsername(req);
    const uid = req.cookies.uid;
    res.render(('users/vistaPerfil'),{username:username,uid, rol})
  } catch (error) {
    
  }
})


//APIS
router.put('/api/usuario/delete/:id',isAutenticated,userDelete);
router.get('/api/usuarios', isAutenticated,verificarRolAdmin,usersRead);
router.get('/api/usuario/:id',isAutenticated,userRead);
router.put('/api/usuario/:id',isAutenticated,verificarRolAdmin,userUpdate);
router.post('/api/create',verificarRolAdmin,verificarRolAdmin,create);



module.exports = router;