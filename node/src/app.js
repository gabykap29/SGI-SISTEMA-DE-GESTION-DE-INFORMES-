const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const path = require('path');

const exphbs = require('express-handlebars');

require('dotenv').config();
const app = express();

app.set('views', path.join(__dirname,'views'))

app.set('view','engine','.hbs');
app.engine('.hbs', exphbs({
    defaultLayaout: 'main',
    layaoutsDir: path.join(app.get('views'),"layaouts"),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));


const port = 3000;
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(require('./routes/router'));

app.use(require('./routes/auth'));
app.use('links',require('./routes/links'));

app.use((req, res, next) =>{
    next();
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port,()=> console.log(`Servidor corriendo en http://localhost:${port}`));