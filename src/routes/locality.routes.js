const ctrlLocalidad = require('../controllers/locality/locality.controller');
const router = require('express').Router();

router.get('/api/localities', ctrlLocalidad.getAll);

module.exports = router;