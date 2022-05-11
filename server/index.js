require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const pgSession = require('express-pg-session')(session);
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const config = require('./default');
const sequelize = require('./databse/db');
const pool = require('./databse/pool');
const cors = require('cors');

const router = require('./routes/index');
const models = require('./models/models').Models(sequelize);
const errorHandler = require('./middleware/errorHandlingMiddleware');
const app = express();

const PORT = process.env.PORT || config.server.port;

require('./services/passportService').google(passport);

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));

app.use(session({
    store: new pgSession({
        pool : pool,
        tableName : 'user_sessions'
    }),
    secret: config.server.session_secret,
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


