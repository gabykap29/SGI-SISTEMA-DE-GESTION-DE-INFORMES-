const {login, closeSesion} = require('../controllers/auth/authctrl');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


//vistas

router.get('/login',(req,res)=> res.render('auth/login'));
router.get('/closeSesion',closeSesion,(req,res)=>{
    res.render('login')});



//apis
router.post('/api/login',login)
//validar token



module.exports = router;