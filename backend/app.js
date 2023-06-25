const express = require('express');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');


const app = express();

require('ejs');
app.set('view engine', 'ejs');

//la carpeta public 

app.use(express.static('public'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
//variables de entorno
dotenv.config({path: './env/.env'})

app.use(require('./routes/router'))


const port = process.env.port || 3000;

app.listen(port, ()=>{
    console.log(`servidor corriendo en http://localhost:${port}`)
});