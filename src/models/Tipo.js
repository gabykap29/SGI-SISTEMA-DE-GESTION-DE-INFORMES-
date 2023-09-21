const {sequelize, DataTypes} = require('../db');
const Informe = require('./Informe');

const Tipo = sequelize.define('Tipo',{
    idTipo:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    paranoid:true,
    modelName:'Tipo',
    tableName:'tipo'
})
Tipo.hasMany(Informe, {
    foreignKey: 'Tipo_idTipo',
    as: 'Informes',
  });
  (async () => {
    try {
        await sequelize.sync()
      // Verifica si la base de datos está vacía
      const count = await Tipo.count();
      if (count === 0) {
        // Agrega un usuario por defecto si la base de datos está vacía
        const array =[
            "Politica", 
            "Institucional", 
            "Educación",
            "Religioso",
            "Proselitismo",
            "Salud",
            "Seguridad",
            "Eventos Climáticos",
            "Hídricos"
        ]
        for(let i = 0; i< array.length; i++){
            await Tipo.create({
                nombre:array[i]
              });
        };
        console.log('Tipos de informes cargados!');
      }else{
        console.log('Los Tipos de informes ya estan cargados!')
      };
      // Realiza operaciones con el modelo aquí
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  })();




Tipo.sync(); 
module.exports = Tipo;