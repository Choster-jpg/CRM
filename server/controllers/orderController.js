const sequelize = require('../databse/db');
const {Order, Supply} = require('../models/models').Models(sequelize);

class orderController
{
    async create(request, response, next)
    {
        try
        {
            const {user_id, product_id, amount} = request.body;

            const order = await Order.create({user_id, product_id, supply_id: null, amount});
            return response.json(order);
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
            let {limit, page} = request.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;

            const orders = await Order.findAndCountAll({limit, offset});
            return response.json(orders);
        }
        catch(e)
        {
            console.log(e);
            return next(e);
        }
    }

    async setInProcess(request, response, next)
    {
        try
        {
            const id = request.params.id;
            const supply_id = request.body.id;

            const order = await Order.update({is_in_process: true, supply_id: supply_id}, {where: {id: id}});
            return response.json(order);
        }
        catch(e)
        {
            console.log(e);
            return next(e);
        }
    }

    async remove(request, response, next)
    {
        const id = request.params.id;
        const order = await Order.update({is_deleted: true}, {where: {id: id}});
        return response.json(order);
    }
}

module.exports = new orderController();