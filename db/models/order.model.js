/**
 * Modelo de Order para ORM
 */
const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDER_TABLE = 'orders';

const OrderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    

}

class Order extends Model {
    
    static config(sequelize) {
        return {
            sequelize,
            ORDER_TABLE,
            modelName: 'Order',
            timestamps: true
        };
    }

    static associate() {
        //Asociaciones
    }

}

module.exports = {
    ORDER_TABLE,
    OrderSchema,
    Order
}