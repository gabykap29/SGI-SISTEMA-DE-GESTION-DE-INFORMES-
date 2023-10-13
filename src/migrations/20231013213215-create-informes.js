'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Informes', {
      idInforme: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Departamento_idDepartamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Departamento',
          key: 'idDepartamento',
        },
      },
      Localidad_idLocalidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Localidad',
          key: 'idLocalidad',
        },
      },
      Tipo_idTipo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tipo',
          key: 'idTipo',
        },
      },
      Fecha: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filesId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Files',
          key: 'idFiles',
        },
      },
      Observaciones: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Informe: {
        type: Sequelize.STRING(4000),
        allowNull: false,
      },
      id_IdUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id',
        },
      },
      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Informes');
  },
};
