const express = require('express');
const router = express.Router();
const isAutenticated = require('../middlewares/autenticate');
const { findDni } = require('../controllers/person/auth.person');


router.post('/api/find/person',isAutenticated,findDni );

module.exports = router;