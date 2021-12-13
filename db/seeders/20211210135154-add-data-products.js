'use strict';
const { Sequelize } = require('sequelize');
const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  up: async (queryInterface) => {
     await  queryInterface.bulkInsert(PRODUCT_TABLE, [{
         name: '',
         price: 0,
         description: '',
         image: '',
         created_at: Sequelize.fn('NOW'),
         category_id: 1
         
     },
    ],{});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  }
};
