'use strict';
const { Sequelize } = require('sequelize');
const  {USER_TABLE } = require('../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await  queryInterface.bulkInsert(USER_TABLE, [{
    email: 'root@yardsale.cl',
    password: 'mio_mio#71',
    create_at: Sequelize.fn('NOW')
   }],{});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
