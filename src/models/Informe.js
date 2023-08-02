const {sequelize, DataTypes} = require('../db');
'use strict';
const Informe = sequelize.define('Informe',{
    idInforme: {type: DataTypes.INTEGER,
        primaryKey:true, 
        autoIncrement:true},
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
     Observaciones:{
            type:DataTypes.STRING,
            allowNull: true
        },
     Informe:{
        type: DataTypes.STRING(4000),
        allowNull:false,
    },
    id_IdUser:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Usuarios',
            key:'id'
        }},
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    },
    createdAt:{
      type: DataTypes.DATE,
      allowNull:false,
      defaultValue:sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt:{
   type:DataTypes.DATE,
   allowNull:false,
   defaultValue:sequelize.literal('CURRENT_TIMESTAMP')
  },
  deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
  }
}, {
    sequelize,
    paranoid: true,
    createdAt:true,
    deletedAt:true,
    modelName: 'Informe',
    tableName: 'informes',
  //   underscored: true
  })

console.log(Informe);
Informe.sync();

module.exports = Informe;