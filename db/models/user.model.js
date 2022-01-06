/**
 * Modelo de User para ORM
 */
const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const USER_TABLE = 'users';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer'
    },
    recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.fn('NOW')
    }
};

class User extends Model {
    
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false,
            hooks: {
                beforeCreate: async (user, options) => {
                    const password = await bcrypt.hash(user.password, 10);
                    user.password = password;
                },
            }
        };
    }

    //Asociaciones
    static associate(models) {
        this.hasOne(models.Customer, {
            foreignKey: 'userId',
            as: 'customer'
        });
    }
}

module.exports = {
    USER_TABLE,
    UserSchema,
    User
}
