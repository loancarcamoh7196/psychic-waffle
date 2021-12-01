/**
 * Modelo de User para ORM
 */
const { Model, DataTypes, Sequelize } = require('sequelize');

const tableName = 'users';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    email : {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    createAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}

class User extends Model {
    
    static config(sequelize) {
        return {
            sequelize,
            tableName,
            modelName: 'User',
            timestamps: false
        };
    }

    static associate() {
        //Asociaciones
    }

}

module.exports = {
    tableName,
    UserSchema,
    User
}