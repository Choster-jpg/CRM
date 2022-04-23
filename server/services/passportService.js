const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../default.json');
const sequelize = require('../databse/db');
const {User} = require('../models/models').Models(sequelize);

class Strategies
{
    google(passport)
    {
        passport.use(new GoogleStrategy({
            clientID: config.auth.google.google_client_id,
            clientSecret: config.auth.google.google_client_secret,
            callbackURL: '/api/user/auth/goolgle/callback'
        },
        async (accessToken, refreshToken, profile, done) => 
        {
            return done(null, profile);
        }));

        passport.serializeUser((user, done) =>
        {
            done(null, user.id);
        });

        passport.deserializeUser(async (id, done) =>
        {
            let user = await User.findOne({ where: {id: id}});
            return done(null, user);
        });
    }
}

module.exports = new Strategies();