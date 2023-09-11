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

const {verificarRolAdmin} = require('../middlewares/checkRol');


router.get('/view/usuarios', isAutenticated,verificarRolAdmin,async(req,res)=>{
    try {
        const username = await obtenerUsername(req)
        res.render('users/vistaUsuario',{username:username});
      } catch (error) {
        console.log('error al obtener el username')
      }
});

router.get('/view/usuarios/create',isAutenticated,verificarRolAdmin,async(req,res)=>{
    try {
        const username = await obtenerUsername(req)
        res.render('users/vistaCrear',{username:username});
      } catch (error) {
        console.log('error al obtener el username')
      }
});

router.get('/usuario/edit/:id',isAutenticated, verificarRolAdmin,async(req,res)=>{
    try {
        const username = await obtenerUsername(req)
        res.render(('users/vistaEditar'),{ id: req.params.id ,username:username});
      } catch (error) {
        console.log('error al obtener el username')
      }
});



//APIS
router.put('/api/usuario/delete/:id',isAutenticated,userDelete);
router.get('/api/usuarios', isAutenticated,verificarRolAdmin,usersRead);
router.get('/api/usuario/:id',isAutenticated,verificarRolAdmin,userRead);
router.put('/api/usuario/:id',isAutenticated,verificarRolAdmin,userUpdate);
router.post('/api/create',verificarRolAdmin,verificarRolAdmin,create);



module.exports = router;