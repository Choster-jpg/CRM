const sequelize = require('../databse/db');
const {Carrier} = require('../models/models').Models(sequelize);

class carrierController
{
    async create(request, response, next)
    {
        try
        {
            const {city, name} = request.body;
            const carrier = await Carrier.create({city: city, name: name});
            return response.json(carrier);
        }
        catch (e)
        {
            console.log(e);
            next(e);
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

            const carriers = await Carrier.findAndCountAll({limit, offset});
            return response.json(carriers);
        }
        catch (e)
        {
            console.log(e);
            next(e);
        }
    }

    async remove(request, response, next)
    {
        try
        {
            const id = request.body.id;
            const carrier = await Carrier.update({is_deleted: true}, {where: {id: id}});
            return response.json(carrier);
        }
        catch (e)
        {
            console.log(e);
            next(e);
        }
    }
}

module.exports = new carrierController();