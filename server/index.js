require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

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

app.use(session({
    secret: 'ya ebu alibabu ',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use('/api', router);

app.use(errorHandler);

const start = async () =>
{
    try
    {
        await sequelize.authenticate();
        await sequelize.sync({force: false});
        app.listen(PORT, () => console.log(`Server has started at ${PORT}`));
    }
    catch(e)
    {
        console.log(e);
    }
};

start();


