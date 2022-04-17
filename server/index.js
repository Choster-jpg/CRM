require('dotenv').config();

const express = require('express');
const config = require('./default');
const sequelize = require('./databse/db');
const cors = require('cors');

const router = require('./routes/index');
const models = require('./models/models').Models(sequelize);
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const app = express();

const PORT = process.env.PORT || config.server.port;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(errorHandler);

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


