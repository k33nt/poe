'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Files', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn('Files', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Files', 'createdAt');
    await queryInterface.removeColumn('Files', 'updatedAt');
  },
};
