const {sequelize, DataTypes} = require('../db');
// 'use strict';

const {Departamento} = require('./Departamento');
const Localidad = sequelize.define('Localidad',{
    idLocalidad:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    nombre:{
        type: DataTypes.STRING,
    },
    Departamento_idDepartamento:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Departamento',
            key:'idDepartamento'
        }
    }
},{
    sequelize,
    paranoid:true,
    modelName: 'Localidad',
    tableName: 'localidad'
});
(async () => {
    try {
        await sequelize.sync()
      // Verifica si la base de datos está vacía
      const Count = await Localidad.count();
      if (Count === 0) {
        // Agrega un usuario por defecto si la base de datos está vacía
        const localidades = [
            {
              idLocalidad: 1,
              nombre: "Formosa",
              Departamento_idDepartamento: 1
            },
            {
              idLocalidad: 2,
              nombre: "Colonia Pastoril",
              Departamento_idDepartamento: 1
            },
            {
              idLocalidad: 3,
              nombre: "Gran Guardia",
              Departamento_idDepartamento: 1
            },
            {
              idLocalidad: 4,
              nombre: "San Hilario",
              Departamento_idDepartamento: 1
            },
            {
              idLocalidad: 5,
              nombre: "Mariano Boedo",
              Departamento_idDepartamento: 1
            },
            {
              idLocalidad: 6,
              nombre: "Villa del Carmen",
              Departamento_idDepartamento: 1
            },
            {
              idLocalidad: 7,
              nombre: "Clorinda",
              Departamento_idDepartamento: 2
            },
            {
              idLocalidad: 8,
              nombre: "Laguna Naick Neck",
              Departamento_idDepartamento: 2
            },
            {
              idLocalidad: 9,
              nombre: "Riacho He He",
              Departamento_idDepartamento: 2
            },
            {
              idLocalidad: 10,
              nombre: "Monte Lindo",
              Departamento_idDepartamento: 2
            },
            {
              idLocalidad: 11,
              nombre: "S.F Laishí",
              Departamento_idDepartamento: 3
            },
            {
              idLocalidad: 12,
              nombre: "Gral. Mansilla",
              Departamento_idDepartamento: 3
            },
            {
              idLocalidad: 13,
              nombre: "Herradura",
              Departamento_idDepartamento: 3
            },
            {
              idLocalidad: 14,
              nombre: "Yatai",
              Departamento_idDepartamento: 3
            },
            {
              idLocalidad: 15,
              nombre: "Misión Tacaagle",
              Departamento_idDepartamento: 4
            },
            {
              idLocalidad: 16,
              nombre: "Laguna Gallo",
              Departamento_idDepartamento: 4
            },
            {
              idLocalidad: 17,
              nombre: "Tres Lagunas",
              Departamento_idDepartamento: 4
            },
            {
              idLocalidad: 18,
              nombre: "El Espinillo",
              Departamento_idDepartamento: 4
            },
            {
              idLocalidad: 19,
              nombre: "Pirané",
              Departamento_idDepartamento: 5
            },
            {
              idLocalidad: 20,
              nombre: "El Colorado",
              Departamento_idDepartamento: 5
            },
            {
              idLocalidad: 21,
              nombre: "Villa Dos Trece",
              Departamento_idDepartamento: 5
            },
            {
              idLocalidad: 22,
              nombre: "Mayor Villafañe",
              Departamento_idDepartamento: 5
            },
            {
              idLocalidad: 23,
              nombre: "Palo Santo",
              Departamento_idDepartamento: 5
            },
            {
              idLocalidad: 24,
              nombre: "Las Lomitas",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 25,
              nombre: "Comandante Fontana",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 26,
              nombre: "Villa Gral Guemes",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 27,
              nombre: "Estanislao del Campo",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 28,
              nombre: "Pozo del Tigre",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 29,
              nombre: "Gral. Belgrano",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 30,
              nombre: "San Martin I",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 31,
              nombre: "San Martin II",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 32,
              nombre: "Fortin Lugones",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 33,
              nombre: "Subt. Perin",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 34,
              nombre: "Posta Cambio Zalazar",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 35,
              nombre: "Colonia Sarmiento",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 36,
              nombre: "Juan G. Bazan",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 37,
              nombre: "Bartolomé De Las Casas",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 38,
              nombre: "El Recreo",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 39,
              nombre: "Fortin Sargento Leyes",
              Departamento_idDepartamento: 6
            },
            {
              idLocalidad: 40,
              nombre: "Fortin Soledad",
              Departamento_idDepartamento: 7
            },
            {
              idLocalidad: 41,
              nombre: "Guadalcazar",
              Departamento_idDepartamento: 7
            },
            {
              idLocalidad: 42,
              nombre: "Lamadrid",
              Departamento_idDepartamento: 7
            },
            {
              idLocalidad: 43,
              nombre: "La Rinconada",
              Departamento_idDepartamento: 7
            },
            {
              idLocalidad: 44,
              nombre: "Los Chiriguanos",
              Departamento_idDepartamento: 7
            },
            {
              idLocalidad: 45,
              nombre: "Pozo de Maza",
              Departamento_idDepartamento: 7
            },
            {
              idLocalidad: 46,
              nombre: "Pozo del Mortero",
              Departamento_idDepartamento: 7
            },
            {
              idLocalidad: 47,
              nombre: "Vaca Perdida",
              Departamento_idDepartamento: 7
            },
            {
              idLocalidad: 48,
              nombre: "Gral. Mosconi",
              Departamento_idDepartamento: 8
            },
            {
              idLocalidad: 49,
              nombre: "El Potrillo",
              Departamento_idDepartamento: 8
            },
            {
              idLocalidad: 50,
              nombre: "Ing. Juarez",
              Departamento_idDepartamento: 9
            }
            // Continuar con el resto de los datos si es necesario
          ];
          
        for(item of localidades){
            console.log(item)
            await Localidad.create({
                nombre:item.nombre,
                Departamento_idDepartamento: item.Departamento_idDepartamento
              });
        };
        console.log('Localidades cargadas!');
      }else{
        console.log('Las Localidades ya estan cargados!')
      };
      // Realiza operaciones con el modelo aquí
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  })();


Localidad.sync();


module.exports = Localidad;