const express = require('express');
const router = express.Router();
const {create, Read, readsAll, deleted, update} = require('../controllers/auth.reports');
const {validarJWT} = require('../middlewares/validar_jwt');
const { isAuthenticated } = require('../middlewares/autenticate');
const { filtrarInformes } = require('../controllers/filtros');



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
router.get('/informe/edit/:id',(req,res)=>{
    res.render('edit',{ id: req.params.id })
});
//apis
router.post('/api/informes/create',create);
router.get('/api/informe/:id',Read);
router.get('/api/informes',readsAll);
router.put('/api/informes/edit/:id',update);
router.put('/api/informes/deleted/:id',deleted)

router.get('/api/filtrar',filtrarInformes);


module.exports = router;