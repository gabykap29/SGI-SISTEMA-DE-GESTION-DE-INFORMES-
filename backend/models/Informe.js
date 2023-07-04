const {sequelize, DataTypes} = require('../db');
const {Departamento} = require('./Departamento')
const {Localidad} = require('./Localidad')
const {Tipo} = require('./Tipo')
const Informe = sequelize.define('Informe',{
    ifInforme: {type: DataTypes.INTEGER, allowNull:false, primaryKey:true},
     Departamento_idDepartamento: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Departamento',
            key:'idDepartamento'
        }
     },
     Localidad_idLocalidad:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Localidad',
            key:'idLocalidad'
        }
     },
     Tipo_idTipo:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Tipo',
            key:'idTipo'
        }
     },
     Fecha:{
        type: DataTypes.DATE,
        allowNull:false,
     },
     Titulo:{
        type: DataTypes.STRING,
        allowNull:false
     },
     RutaImagen:{
        type:DataTypes.STRING,
        allowNull:true
     },
     Informe:{
        type: DataTypes.STRING(888),
        allowNull:false,
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
}, {
    sequelize,
    paranoid: true,
    modelName: 'Informe',
    tableName: 'informes',
  //   underscored: true
  })

console.log(Informe);
Informe.sync();

module.exports = Informe;