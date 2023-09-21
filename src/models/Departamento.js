const {sequelize, DataTypes} = require('../db');
const Informe = require('./Informe');
const Localidad = require('./Localidad')

// 'use strict';


const Departamento = sequelize.define('Departamento',{
    idDepartamento:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    nombre:{
        type: DataTypes.STRING,
    }
},{
    sequelize,
    paranoid:true,
    modelName: 'Departamento',
    tableName: 'departamento'
})
Departamento.hasMany(Informe, {
    foreignKey: 'Departamento_idDepartamento',
    as: 'Informes',
  });
  Departamento.hasMany(Localidad, {
    foreignKey: 'Departamento_idDepartamento',
    as: 'Localidad',
  });
console.log(Departamento);


(async () => {
    try {
        await sequelize.sync()
      // Verifica si la base de datos está vacía
      const deparCount = await Departamento.count();
      if (deparCount === 0) {
        // Agrega un usuario por defecto si la base de datos está vacía
        const array =[
            "Formosa",
            "Pilcomayo",
            "Pilagás",
            "Laishí",
            "Pirané",
            "Patiño",
            "Bermejo",
            "Ramon",
            "Matacos"
        ]
        for(let i = 0; i< array.length; i++){
            await Departamento.create({
                nombre:array[i]
              });
        };
        console.log('Departamentos cargados!');
      }else{
        console.log('Los Departamentos ya estan cargados!')
      };
      // Realiza operaciones con el modelo aquí
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  })();

Departamento.sync();



module.exports = Departamento;