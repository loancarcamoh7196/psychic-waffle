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
        unique: true,
        type: DataTypes.STRING,
    },
    image: {
        allowNull: true,
        type: DataTypes.BLOB
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    }
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

    static associate(models) {
        //Asociaciones
        this.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'categoryId'
        });
    }

}

module.exports = {
    CATEGORY_TABLE,
    CategorySchema,
    Category
}