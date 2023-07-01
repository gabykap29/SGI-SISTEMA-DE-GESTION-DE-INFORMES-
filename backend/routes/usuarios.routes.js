const express = require('express');
const router = express.Router();

const {
    create,
    usersRead,
    userRead,
    userUpdate,
    userDeleted
} = require('../controllers/user');

const {validarJWT} = require('../middlewares/validar_jwt');

//Vistas
router.get('/register', async(req,res)=>{
    return res.render('register');
})

//APIS

router.get('/api/usuarios', [validarJWT], usersRead);
router.get('/api/usuario/:id',userRead);
router.put('/api/usuario/:id',userUpdate);
router.post('/api/create',create);
// router.delete('/api/usuario/id:',userDeleted);


module.exports = router;