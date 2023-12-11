const ctrlDepartamento = require('../controllers/departament/departament.controller');
const router = require('express').Router();

router.get('/api/departaments', ctrlDepartamento.getAll);


module.exports = router;