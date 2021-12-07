'use strict';
const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.changeColumn( CUSTOMER_TABLE, 'user_id', {
            field: 'user_id',
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: true,
        });
    },

    down: async (queryInterface) => {
        // await queryInterface.dropTable(CUSTOMER_TABLE);
        // await queryInterface.removeColumn(CUSTOMER_TABLE, 'user_id', CustomerSchema.role);
    }
};
