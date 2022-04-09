require('dotenv').config();

const express = require('express');
const config = require('./default');
const sequelize = require('./databse/db');
const cors = require('cors');

const models = require('./models/models').Models(sequelize);
const app = express();

const PORT = process.env.PORT || config.server.port;

app.use(cors());
app.use(express.json());

const start = async () =>
{
    try
    {
        await sequelize.authenticate();
        await sequelize.sync({force: true});
        app.listen(PORT, () => console.log(`Server has started at ${PORT}`));
    }
    catch(e)
    {
        console.log(e);
    }
};

start();


