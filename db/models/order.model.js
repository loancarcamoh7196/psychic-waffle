/**
 * Modelo de Order para ORM
 */
const { Model, DataTypes, Sequelize } = require('sequelize');

const tableName = 'orders';

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
            tableName,
            modelName: 'Order',
            timestamps: true
        };
    }

    static associate() {
        //Asociaciones
    }

}

module.exports = {
    tableName,
    OrderSchema,
    Order
}