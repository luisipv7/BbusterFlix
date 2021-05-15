'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Movies', [
      {
        titulo: 'Batman Begins',
        diretor: 'Christopher Nolan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Batman o Cavaleiro das Trevas',
        diretor: 'Christopher Nolan',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Movies', null, {});

  }
};
