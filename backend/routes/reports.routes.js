const express = require('express');
const router = express.Router();
const {create, Read, readsAll, deleted} = require('../controllers/auth.reports');
const {validarJWT} = require('../middlewares/validar_jwt');

router.post('/api/informes/create',create);
router.get('/api/informe/id:',[validarJWT],Read);
router.get('/api/informes/id:',[validarJWT],readsAll);
router.put('/api/informes/deleted/id:', validarJWT,deleted)


module.exports = router;