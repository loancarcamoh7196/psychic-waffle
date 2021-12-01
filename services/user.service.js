/**
 * Servicio / Controlador de Users
 */
const { models } = require('../libs/sequelize'); // Acceso a modelo creados por lib sequelize
const boom = require('@hapi/boom');

class UserService {
    constructor() {  }

    /**
     * Crea/Agrega un nuevo Usuario
     * @param {user} data 
     * @returns string Resultado de operación
     */
    async create(data) {
        const newUser = await models.User.create(data);
        return newUser;
    }

    /**
     * Lista todos los usuarios de sistema
     * TODO: deshabilitar metodo cuando se ponga en produccion *
     * @returns lista de Usuarios
     */
    async find() {
        const rta = await models.User.findAll();
        return rta;
    }

    /**
     * Busca y retorna info de usuario especificado por ID
     * @param {int} id ID usuario
     * @returns objecto usuario
     */
    async findOne(id) {
        const user = await models.User.findByPk(id);
        if(!user) {
            throw boom.notFound('Usuario no se encuentra registrado');
        } else return user;
    }

    /**
     * Actualiza datos relacionado a usario especifico
     * @param {int} id ID de usuario
     * @param {*} changes Cambios a realizar
     * @returns string Resultado Operación
     */
    async update(id, changes) {
        const user = await this.findOne(id);
        const rta = await user.update(changes);
        return rta;
    }

    /**
     * Elimina usaurio especificado por ID
     * @param {int} id ID de usuario especifico
     * @returns ID usuario eleminado
     */
    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
    }
}

module.exports = UserService;