'use strict';
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const  {USER_TABLE } = require('../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    const hash = await bcrypt.hash('mio_mio#71', 10);
    await  queryInterface.bulkInsert(USER_TABLE, [
        {
            email: 'root@yardsale.cl',
            role: 'admin',
            password: hash,
            created_at: Sequelize.fn('NOW')
        },{
            email: 'lo@yardsale.cl',
            role: 'seller',
            password: hash,
            created_at: Sequelize.fn('NOW')
        },{
            email: 'lo@love.cl',
            password: hash,
            created_at: Sequelize.fn('NOW')
        },
    ],{});
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
