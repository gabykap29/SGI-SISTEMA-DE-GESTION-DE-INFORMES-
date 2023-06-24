const mysql = require('mysql');
const {promisify} = require('util');
const {database}=require('./keys');

const pool = mysql.createPool(database);

//ERRORES COMUNES DE CONECCIÓN CON SQL

pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log(' database was closed')
        }else if (err.code === 'ER_CON_COUNT_ERROR'){
            console.log('DATABASE HAS TO MANY CONNECTIONS')
        }else if (err.code === 'ECONNREFUSED'){
            console.log('DATABASE CONNECTION WAS REFUSED')
        }
    }
    if(connection) connection.release();
    console.log('DB IS CONNECTED');
    return;
});
//utyilizar promesas
pool.query = promisify(pool.query);
module.exports = pool;