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
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    image: {
        allowNull: true,
        // type: DataTypes.BLOB
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.fn('NOW')
    }
};

class Category extends Model {

    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        };
    }

    //Asociaciones
    static associate(models) {
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