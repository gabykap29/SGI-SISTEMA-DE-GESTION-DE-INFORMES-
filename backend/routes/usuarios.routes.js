const express = require('express');
const router = express.Router();
const isAutenticated = require('../middlewares/autenticate');

const {
    create,
    usersRead,
    userRead,
    userUpdate,
    userDeteled
} = require('../controllers/user');

const {validarJWT} = require('../middlewares/validar_jwt');

//Vistas
router.get('/register', isAutenticated,async(req,res)=>{
    return res.render('register');
})

router.get('/view/usuarios', isAutenticated,(req,res)=>{
    res.render('users/vistaUsuario')
})

router.get('/view/usuarios/create',isAutenticated,(req,res)=>{
    res.render('users/vistaCrear')
})

//APIS

router.get('/api/usuarios', isAutenticated,usersRead);
router.get('/api/usuario/:id',isAutenticated,userRead);
router.put('/api/usuario/:id',isAutenticated,userUpdate);
router.post('/api/create',isAutenticated,create);
router.put('/api/usuario/delete/id:',isAutenticated,userDeteled);


module.exports = router;