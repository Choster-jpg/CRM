const sequelize = require('../databse/db');
const { Supply } = require('../models/models').Models(sequelize);

class supplyController
{
    async create(request, response, next)
    {
        try
        {
            const {address_from, address_to, date, carrier_id} = request.body;
            const supply = await Supply.create({address_from, address_to, date, carrier_id});

            return response.json(supply);
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
            const {address_from, address_to, date} = request.query;
            let {limit, page} = request.query;

            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;
            let supplies;

            if (address_from && address_to && date)
            {
                supplies = await Supply.findAndCountAll({limit, offset, where: {address_from: address_from, address_to: address_to, date: date}});
            }

            else if (!address_from && address_to && date)
            {
                supplies = await Supply.findAndCountAll({limit, offset, where: {address_to: address_to, date: date}});
            }

            else if (!address_from && !address_to && date)
            {
                supplies = await Supply.findAndCountAll({limit, offset, where: {date: date}});
            }

            else if (!address_from && !address_to && !date)
            {
                supplies = await Supply.findAndCountAll({limit, offset});
            }

            else if (address_from && !address_to && !date)
            {
                supplies = await Supply.findAndCountAll({limit, offset, where: {address_from: address_from}});
            }

            else if (address_from && address_to && !date)
            {
                supplies = await Supply.findAndCountAll({limit, offset, where: {address_from: address_from, address_to: address_to}});
            }

            else if (!address_from && address_to && !date)
            {
                supplies = await Supply.findAndCountAll({limit, offset, where: {address_to: address_to}});
            }

            return response.json(supplies);
        }
        catch(e)
        {
            console.log(e);
            return next(e);
        }
    }
}

module.exports = new supplyController();