/**
 * Modelo de Customer para ORM
 */
const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name : {
        allowNull: false,
        type: DataTypes.STRING,
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name',
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer'
    },
    phone : {
        allowNull: false,
        type:DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.fn('NOW')
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',

    }
}

class Customer extends Model {
    
    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamps: false,

        };
    }

    static associate(models) {
        //Asociaciones
        this.belongsTo(models.User, {as: 'user'});
        this.hasMany(models.Order,{
            as: 'orders',
            foreignKey: 'customerId'
        });
    }

}

module.exports = {
    CUSTOMER_TABLE,
    CustomerSchema,
    Customer
}