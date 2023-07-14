const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');


const app = express();

require('ejs');
app.set('view engine', 'ejs');

//la carpeta public 
app.use(express.static('public'));

//midlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));
app.use(cors())
app.use(cookieParser());
//variables de entorno
dotenv.config({path: './env/.env'})


app.use(require('./routes/auth.routes'));
app.use(require('./routes/usuarios.routes'));
app.use(require('./routes/reports.routes'));


const port = process.env.port || 3000;

//Si ingresan a una ruta no declarada, se redirigirá al inicio.
app.use((req, res, next) => {
    res.render('error/error')
});


app.listen(port, ()=>{
    console.log(`servidor corriendo en http://localhost:${port}/login`)
});