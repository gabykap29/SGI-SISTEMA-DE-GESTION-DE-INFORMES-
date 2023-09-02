const express = require('express');
const router = express.Router();
const isAutenticated = require('../middlewares/autenticate');
const { findDni } = require('../controllers/person/auth.person');

router.get('/ver/personas', isAutenticated,(req,res)=>{
    res.render('person/index')
  });
  //api
router.post('/api/find/person',isAutenticated,findDni );

module.exports = router;