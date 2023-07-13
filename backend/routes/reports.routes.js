const express = require('express');
const router = express.Router();
const {create, Read, readsAll, deleted, update} = require('../controllers/auth.reports');
const { filtrarInformes } = require('../controllers/filtros');
const isAutenticated = require('../middlewares/autenticate');


//vistas
router.get('/informes/views',isAutenticated,(req,res)=>{
    res.render('views')
})
router.get('/informes/create',isAutenticated,(req,res)=>{
    res.render('create')
})
router.get('/index',isAutenticated,(req,res)=>{
    res.render('index')
})
router.get('/informes/view/:id',isAutenticated,(req,res)=>{
    res.render('view',{ id: req.params.id })
})
router.get('/informe/edit/:id',isAutenticated,(req,res)=>{
    res.render('edit',{ id: req.params.id })
});
//apis
router.post('/api/informes/create',isAutenticated,create);
router.get('/api/informe/:id',isAutenticated,Read);
router.get('/api/informes',isAutenticated,readsAll);
router.put('/api/informes/edit/:id',isAutenticated,update);
router.put('/api/informes/deleted/:id',isAutenticated,deleted)

router.get('/api/filtrar',isAutenticated,filtrarInformes);


module.exports = router;