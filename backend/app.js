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

app.use(require('./routes/auth.routes'));
app.use(require('./routes/usuarios.routes'));
app.use(require('./routes/reports.routes'));


const port = process.env.port || 3000;

//Si ingresan a una ruta no declarada, se redirigirá al inicio.
app.use((req, res, next) => {
    res.write(`<div>
        <h1>404 - Ruta no encontrada</h1>
        <hr>
        <p>La pagina que intentas buscar no existe</p>
        <p>Redireccionando a la página de inicio...</p>
        <script>
        (
          () => setTimeout(() => {
            window.location.href='http://localhost:${port}/index';
           }, 3000)           
        )();
        </script>
    </h1>`)
});


app.listen(port, ()=>{
    console.log(`servidor corriendo en http://localhost:${port}/login`)
});