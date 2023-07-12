const express = require('express');
const router = express.Router();

const {
    create,
    usersRead,
    userRead,
    userUpdate,
    userDeteled
} = require('../controllers/user');

const {validarJWT} = require('../middlewares/validar_jwt');

//Vistas
router.get('/register', async(req,res)=>{
    return res.render('register');
})

router.get('/view/usuarios', (req,res)=>{
    res.render('users/vistaUsuario')
})

router.get('/view/usuarios/create',(req,res)=>{
    res.render('users/vistaCrear')
})

//APIS

router.get('/api/usuarios', usersRead);
router.get('/api/usuario/:id',userRead);
router.put('/api/usuario/:id',userUpdate);
router.post('/api/create',create);
router.put('/api/usuario/delete/id:',userDeteled);


module.exports = router;