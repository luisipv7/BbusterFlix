'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('VideoStores', [{
      rented: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('VideoStores', null, {});

  }
};
