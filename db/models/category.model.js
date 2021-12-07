/**
 * Modelo de Category para ORM
 */
const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
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
    image: {
        allowNull: true,
        type: DataTypes.BLOB
    },
}

class Category extends Model {

    static config(sequelize) {
        return {
            sequelize,
            CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        };
    }

    static associate() {
        //Asociaciones
    }

}

module.exports = {
    CATEGORY_TABLE,
    CategorySchema,
    Category
}