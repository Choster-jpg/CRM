const sequelize = require('../databse/db');
const {Product} = require('../models/models').Models(sequelize);
const { QueryTypes } = require('sequelize');

class productController
{
    async create(request, response, next)
    {
        try
        {
            const {name, amount, price} = request.body;
            const product = await Product.create({name: name, amount: amount, price: price});

            return response.json(product);
        }
        catch(e)
        {
            console.log(e);
            return next(e);
        }
    }

    async getAll(request, response, next)
    {
        try
        {
            const {minPrice, maxPrice, name} = request.query;
            let {limit, page} = request.query;

            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;
            let products;
            let result = [];

            if (minPrice && maxPrice && name)
            {
                products = await sequelize.query('SELECT * from products WHERE price BETWEEN :minvalue AND :maxvalue AND name LIKE :name AND is_deleted = false',
                    {
                        replacements: {minvalue: +minPrice, maxvalue: +maxPrice, name: `%${name}%`},
                        type: QueryTypes.SELECT
                    });
            }

            else if (!minPrice && maxPrice && name) {
                products = await sequelize.query('SELECT * from products WHERE price < :maxvalue AND name LIKE :name AND is_deleted = false',
                    {
                        replacements: {maxvalue: maxPrice, name: `%${name}%`},
                        type: QueryTypes.SELECT
                    });
            }

            else if (!minPrice && !maxPrice && name) {
                products = await sequelize.query('SELECT * from products WHERE name LIKE :name AND is_deleted = false',
                    {
                        replacements: {name: `%${name}%`},
                        type: QueryTypes.SELECT
                    });
            }

            else if (!minPrice && !maxPrice && !name)
            {
                products = await Product.findAndCountAll({limit, offset, where: {is_deleted : false}});
                return response.json(products);
            }

            else if (minPrice && !maxPrice && !name) {
                products = await sequelize.query('SELECT * from products WHERE price > :minvalue AND is_deleted = false',
                    {
                        replacements: {minvalue: minPrice, name: `%${name}%`},
                        type: QueryTypes.SELECT
                    });
            }

            else if (minPrice && maxPrice && !name) {
                products = await sequelize.query('SELECT * from products WHERE price > :minvalue AND price < :maxvalue AND is_deleted = false',
                    {
                        replacements: {minvalue: minPrice, maxvalue: maxPrice},
                        type: QueryTypes.SELECT
                    });
            }

            else if (!minPrice && maxPrice && !name) {
                products = await sequelize.query('SELECT * from products WHERE price < :maxvalue AND is_deleted = false',
                    {
                        replacements: {maxvalue: maxPrice},
                        type: QueryTypes.SELECT
                    });
            }

            else if (minPrice && !maxPrice && name) {
                products = await sequelize.query('SELECT * from products WHERE name LIKE :name AND price > :minvalue AND is_deleted = false',
                    {
                        replacements: {name: `%${name}%`, minvalue: minPrice},
                        type: QueryTypes.SELECT
                    });

            }

            if(products.length > limit)
            {
                if(offset + limit < products.length)
                {
                    for (let i = offset; i < offset + limit; i++)
                    {
                        result.push(products[i]);
                    }
                }
                else
                {
                    for (let i = offset; i < products.length; i++)
                    {
                        result.push(products[i]);
                    }
                }
                return response.json({count: result.length, rows: result});
            }
            else
            {
                if(page == 1)
                    return response.json({count: result.length, rows: result});

                return response.json({count: result.length, rows: result});
            }


        }
        catch(e)
        {
            console.log(e);
            return next(e);
        }
    }

    async remove(request, response, next)
    {
        try
        {
            const id = request.body.id;
            const product = await Product.update({is_deleted: true}, {where: {id: id}});
            return response.json(product);
        }
        catch (e)
        {
            console.log(e);
            return next(e);
        }
    }

    async increment(request, response, next)
    {
        try
        {
            const id = request.body.id;
            console.log(id);
            const previous = await Product.findByPk(id);

            const product = await Product.update({amount: previous.amount + 1}, {where: {id: id}});
            return response.json(product);
        }
        catch(e)
        {
            console.log(e);
            return next(e);
        }
    }
}

module.exports = new productController();