/**
 * *  Servicio / Controladorde Product
 */
const faker = require('faker');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');



class ProductsService {
    constructor() {
        this.products = [];
        this.generate();
    }

    /**
     * Genera Data para Producto
     */
    generate() {
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl()
            });
        }
    }

    /**
     * Crea / Agrega un nuevo Usuario
     * @param {user} data 
     * @returns string Resultado de operación
     */
    async create(data) {
        const newProduct = await models.Product.create(
            data
        );
        return newProduct;
    }

    /**
     * Lista de todos los productos del sistema
     * @param {options} query Objcto con distintas opciones
     * @returns lista de Productos
     */
    async find(query) {
        const options = { 
            include: ['category'],
            where: {}
        };
        
        const { limit, offset, price, price_min, price_max } = query;

        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }

        price && (options.price = price); // Si se ha mandado en query se consultar por price
        
        if (price_min && price_max) {
            options.where.price = {
                [Op.between]: [price_min, price_max]
            };
        }

        const products = await models.Product.findAll(options);
        return products;
    }

    async findOne(id) {
        const product = this.products.find((item) => item.id === id);
        if (!product) {
            throw boom.notFound('Producto no encontrado');
        }
        if (product.isBlock) {
            throw boom.conflict('Producto no esta disponible');
        }
        return product;
    }

    async update(id, changes) {
        const index = this.products.findIndex((item) => item.id === id);

        if (index === -1) {
            throw boom.notFound('Producto no encontado');
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        };
        return this.products[index];
    }

    async delete(id) {
        const index = this.products.findIndex(
            (item) => item.id === id
        );
        if (index === -1) {
            throw boom.notFound('Producto no disponible');
        }
        this.products.splice(index, 1);
        return { id };
    }
}

module.exports = ProductsService;
