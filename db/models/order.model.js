/**
 * * Modelo de Order para ORM
 */
const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CUSTOMER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.fn('NOW')
    },
    
};

// const virtualField = {
//     total: {
//         type: DataTypes.VIRTUAL,
//         get() {
//             if (this.items && this.items.length > 0) {
//                 return this.items.reduce((total, item) => {
//                     return ( total + item.price * item.OrderProduct.amount );
//                 }, 0);
//             } else return 0;
//         }
//     }
// };
class Order extends Model {
    
    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false
        };
    }

    static associate(models) {
        //Asociaciones
        this.belongsTo(models.Customer, { as: 'customer'});
        this.belongsToMany(models.Product, {
            as: 'items',
            through: models.OrderProduct,
            foreignKey: 'orderId',
            otherKey: 'productId'
        });
    }
}

module.exports = {
    ORDER_TABLE,
    OrderSchema,
    Order
}