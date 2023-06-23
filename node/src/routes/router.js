const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({'saludo':'Hola mundo'});
});


module.exports = router;