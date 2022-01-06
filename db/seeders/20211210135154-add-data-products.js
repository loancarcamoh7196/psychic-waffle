'use strict';
const { Sequelize } = require('sequelize');
const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
        PRODUCT_TABLE,
        [
            {
                name: 'Product 1',
                price: 10,
                description: 'Pretty product',
                image: 'http://placeimg.com/640/480',
                created_at: Sequelize.fn('NOW'),
                category_id: 1
            }, {
                name: 'Product 3',
                price: 5,
                description: 'Pretty product',
                image: 'http://placeimg.com/640/480',
                created_at: Sequelize.fn('NOW'),
                category_id: 1
            }, {
                name: 'Product 2',
                price: 71,
                description: 'Pretty product',
                image: 'http://placeimg.com/640/480',
                created_at: Sequelize.fn('NOW'),
                category_id: 2
            }
        ],
        {}
    );
    },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  }
};
