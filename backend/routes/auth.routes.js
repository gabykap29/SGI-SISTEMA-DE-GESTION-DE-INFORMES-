const {login} = require('../controllers/authctrl');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.get('/login',(req,res)=> res.render('auth/login'));
router.get('/register',(req,res)=>res.render('auth/register'));
router.get('/index',(req,res)=>{
    res.render('index')
})

router.get('/create',(req,res)=>{
    res.render('create')
})

router.post('/api/login',login)

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