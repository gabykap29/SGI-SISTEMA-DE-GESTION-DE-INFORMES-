const stringKey = process.env.keyEncrypt;
const crypto = require("crypto");

//configuración de cifrado

const algoritm = "aes-256-cbc"; //algoritmo de cifrado
const key = crypto.createHash('sha256').update(stringKey).digest(); //clave de cifrado
const iv = crypto.randomBytes(16); //vector de inicialización

//función para encriptar el texto

function encrypt(text) {
    try {
        const cipher = crypto.createCipheriv(algoritm, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex'); //cifrar texto
        encrypted += cipher.final('hex'); //finalizar cifrado
        //el hex es la codificación de salida
        return {encryptedData: encrypted, iv: iv.toString('hex')};
    } catch (error) {
        console.log('Error encriptando el contenido: ', error);
    }
}

function descrypt(encryptedData, ivHex){
    try {
        const deciper = crypto.createDecipheriv(algoritm, key, Buffer.from(ivHex, 'hex'));
        let descrypted = deciper.update(encryptedData, 'hex', 'utf8');
        descrypted += deciper.final('utf8');
        return descrypted;
    } catch (error) {
        console.log('Error desencriptando el contenido: ', error);
    }
} 

module.exports = {encrypt, descrypt};