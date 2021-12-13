'use strict';
const { Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
  up: async (queryInterface) => {
   await  queryInterface.bulkInsert(CATEGORY_TABLE, [{
            name: 'Vestuario',
            image: '',
            created_at: Sequelize.fn('NOW')
        },{
            name: 'Electronica',
            image: '',
            created_at: Sequelize.fn('NOW')
        },{
            name: 'Muebles',
            image: '',
            created_at: Sequelize.fn('NOW')
        },{
            name: 'Jugetes',
            image: '',
            created_at: Sequelize.fn('NOW')
        },{
            name: 'Otros',
            image: '',
            created_at: Sequelize.fn('NOW')
        },

    ],{});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(CATEGORY_TABLE, null, {});
  }
};
