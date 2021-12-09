/**
 * *  Servicio / Controladorde Product
 */
const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');


class ProductsService {
    constructor() {
        this.products = [];
        this.generate();
    }

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

    async create(data) {
        const newProduct = await models.Product.create(
            data
        );
        return newProduct;
    }

    async find() {
        const products = await models.Product.findAll({
            include: ['category']
        });
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
