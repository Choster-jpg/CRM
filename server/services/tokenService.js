const jwt = require('jsonwebtoken');
const config = require('../default');

const sequelize = require('../databse/db');
const {Token} = require('../models/models').Models(sequelize);

class TokenService
{
    generateTokens(payload)
    {
        const accessToken = jwt.sign(payload, config.jwt.access_secret, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, config.jwt.refresh_secret, {expiresIn: '30d'});

        console.log(accessToken, refreshToken)
        return {accessToken, refreshToken }
    }

    validateAccessToken(token)
    {
        try
        {
            const userData = jwt.verify(token, config.jwt.access_secret);
            return userData;
        }
        catch(e)
        {
            return null;
        }
    }

    validateRefreshToken(token)
    {
        try
        {
            const userData = jwt.verify(token, config.jwt.refresh_secret);
            return userData;
        }
        catch(e)
        {
            return null;
        }
    }

    async saveToken(userId, refreshToken)
    {
        let tokenData = await Token.findOne({user: userId});
        console.log(refreshToken)
        if(tokenData)
        {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({user: userId, refreshToken: refreshToken});
        return token;
    }

    async removeToken(refreshToken)
    {
        const tokenData = await Token.destroy({where: {refreshToken: refreshToken}});
        return tokenData;
    }

    async findToken(refreshToken)
    {
        const tokenData = await Token.findOne({where: {refreshToken: refreshToken}});
        return tokenData;
    }
}

module.exports = new TokenService();