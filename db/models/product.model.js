/**
 * Modelo Producto para ORM
 */
const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE =  'products';

const ProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    image: {
        allowNull: true,
        type: DataTypes.BLOB
    },
}

class Product extends Model {
    
    static config(sequelize) {
        return {
            sequelize,
            PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false
        };
    }

    static associate() {
        //Asociaciones
    }
}

module.exports = {
    PRODUCT_TABLE,
    ProductSchema,
    Product
}