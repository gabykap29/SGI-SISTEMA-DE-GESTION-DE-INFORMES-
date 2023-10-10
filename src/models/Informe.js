const {sequelize, DataTypes} = require('../db');
const Person = require('./Person')
const InformePerson = require('./InformePerson')
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
  Informe.belongsToMany(Person, {
    through: InformePerson,
    foreignKey: 'informeId',
    as: 'informePersons'
})
  Person.belongsToMany(Informe, {
        through: InformePerson,
        foreignKey: 'personId',
        as: 'informePersons'
    });
    const Tipo = require('./Tipo')
    Informe.belongsTo(Tipo, {
        foreignKey: 'Tipo_idTipo',
        as: 'Informes', // Alias para la relación
      });
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
Informe.sync();
Person.sync();

module.exports = Informe;