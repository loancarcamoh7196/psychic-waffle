/**
 * * Servicio / Controlador de Category
 */
const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');

class CategoryService {
    constructor() {}

    /**
     * Crea/Agrega un nuevo Usuario
     * @param {category} data 
     * @returns string Resultado de operación
     */
    async create(data) {
        const newCategory = await models.Category.create(data);
        return newCategory;
    }

    /**
     * Lista todos las categories de sistema
     * @returns lista de Category
     */
    async find() {
        const categories = await models.Category.findAll();
        return categories;
    }

    /**
     * Busca y retorna info de usaurio especifico por ID
     * @param {int} id ID de category
     * @returns Objecto Categoria
     */
    async findOne(id) {
        const category = await models.Category.findByPk(id);
        if (!category) {
            throw boom.notFound('Categoria no encontrada');
        }
        return category;
    }

    /**
     * Actualiza datos relacionado a categoria especifico
     * @param {int} id ID de Category
     * @param {*} changes Cambios a realizar
     * @returns string Resultado Operación
     */
    async update(id, changes) {
        const model = await this.findOne(id);
        const rta = await model.update(changes);
        return rta;
    }

    /**
     * Elimina categoria especificadp por ID
     * @param {int} id ID de categoria
     * @returns ID categoria eliminado
     */
    async delete(id) {
        const model = await this.findOne(id);
        await model.destroy();
        return { rta: true };
    }
}

module.exports = CategoryService;
