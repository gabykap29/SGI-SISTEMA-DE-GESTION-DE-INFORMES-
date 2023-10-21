const {sequelize, DataTypes} = require('../db');
const Person = require('./Person');

const ImgPerson = sequelize.define('ImgPerson',{
    idImgPerson:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },rutaImagen:{
        type: DataTypes.STRING,
        allowNull:true
    },
    personId: {
        type: DataTypes.INTEGER,
        allowNull:false,
}
},{
    sequelize,
    paranoid:true,
    modelName: 'ImgPerson',
    tableName: 'imgperson'
});

module.exports = ImgPerson;