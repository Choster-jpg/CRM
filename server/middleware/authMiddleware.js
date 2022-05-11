const ApiError = require('../error/ApiError');
const tokenService = require('../services/tokenService');

module.exports = function(isRoleCheckNecessary)
{
    return function (req, res, next)
    {
        try
        {
            if(req.isAuthenticated())
            {
                return next();
            }

            const authorizationHeader = req.headers.authorization;
            if(!authorizationHeader)
            {
                return next(ApiError.Unauthorized());
            }

            const accessToken = authorizationHeader.split(' ')[1];
            if(!accessToken)
            {
                return next(ApiError.Unauthorized());
            }

            const userData = tokenService.validateAccessToken(accessToken);
            if(!userData)
            {
                return next(ApiError.Unauthorized());
            }

            if(isRoleCheckNecessary === true)
            {
                if (userData.role !== 'ADMIN')
                {
                    return next(ApiError.Forbidden());
                }
            }

            req.user = userData;
            next();
        }
        catch (e)
        {
            return next(ApiError.Unauthorized());
        }
    }
}