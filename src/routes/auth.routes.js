const {login, closeSesion} = require('../controllers/auth/authctrl');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();


//vistas
router.get('/login',(req,res)=> res.render('auth/login'));
// router.get('/register',(req,res)=>res.render('auth/register'));
router.get('/closeSesion',closeSesion,(req,res)=>{
    res.render('login')});
//apis
router.post('/api/login',login)
//validar token
router.get('/api/validar-token',(req,res)=>{
    const token = req.header('Authorization');
    if(!token){
        return res.redirect('/login');
    }
    const isValidToken = jwt.verify(token,process.env.SECRET_KEY);

    if(!isValidToken){
        return res.redirect('login');
    }
    return res.json ({ok:true})
})


module.exports = router;