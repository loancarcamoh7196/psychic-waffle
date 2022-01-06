'use strict';
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const  {USER_TABLE } = require('../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    const hash = await bcrypt.hash('mio_mio#71', 10);
    await queryInterface.bulkInsert(
        USER_TABLE,
        [
            {
                email: 'root@yardsale.cl',
                password: hash,
                role: 'admin',
                created_at: Sequelize.fn('NOW')
            },
            {
                email: 'lo@yardsale.cl',
                password: hash,
                role: 'seller',
                created_at: Sequelize.fn('NOW')
            },
            {
                email: 'lo@love.cl',
                password: hash,
                role: 'customer',
                created_at: Sequelize.fn('NOW')
            }
        ],
        {}
    );
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
