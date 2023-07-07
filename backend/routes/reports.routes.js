const express = require('express');
const router = express.Router();
const {create, Read, readsAll, deleted} = require('../controllers/auth.reports');
const {validarJWT} = require('../middlewares/validar_jwt');



//vistas
router.get('/informes/views',(req,res)=>{
    res.render('views')
})
router.get('/informes/create',(req,res)=>{
    res.render('create')
})
router.get('/index',(req,res)=>{
    res.render('index')
})
router.get('/informes/view/:id',(req,res)=>{
    res.render('view',{ id: req.params.id })
})

//apis
router.post('/api/informes/create',create);
router.get('/api/informe/:id',Read);
router.get('/api/informes',readsAll);
router.put('/api/informes/deleted/:id',deleted)


module.exports = router;