const userService = require('../services/userService');
const config = require('../default.json');
const passportService = require('../services/passportService');
const ApiError = require('../error/ApiError');

const passport = require('passport');
const {validationResult} = require('express-validator');

class UserController
{
    async register(request, response, next)
    {
        try
        {
            const errors = validationResult(request);
            if(!errors.isEmpty())
            {
                return next(new ApiError('Ошибка при валидации', errors.array()))
            }
            const {email, password} = request.body;
            const userData = await userService.register(email, password);
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})

            return response.json(userData);
        }
        catch(e)
        {
            next(e);
        }
    }

    async login(request, response, next)
    {
        try
        {
            const {email, password} = request.body;
            const userData = await userService.login(email, password);
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})

            return response.json(userData);
        }
        catch(e)
        {
            next(e);
        }
    }

    async logout(request, response, next)
    {
        try
        {
            const {refreshToken} = request.cookies;
            const token = await userService.logout(refreshToken);
            response.clearCookie('refreshToken');
            return response.json(token);
        }
        catch(e)
        {
            next(e);
        }
    }

    async reset(request, response, next)
    {
        try
        {
            const {email} = request.body;
            const userData = await userService.reset(email);

            return response.json(userData);
        }
        catch(e)
        {
            next(e);
        }
    }

    async resetPassword(request, response, next)
    {
        try
        {
            const {email, password} = request.body;
            const userData = await userService.resetPassword(email, password);

            return response.json(userData);
        }
        catch(e)
        {
            next(e);
        }
    }

    async refresh(request, response, next)
    {
        try
        {
            const {refreshToken} = request.cookies;
            const userData = await userService.refresh(refreshToken);
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})

            return response.json(userData);
        }
        catch(e)
        {
            next(e);
        }
    }

    async activate(request, response, next)
    {
        try
        {
            const activationLink = request.params.link;
            await userService.activate(activationLink);
            return response.redirect(config.server.client_url);
        }
        catch(e)
        {
            next(e);
        }
    }

    async getUsers(request, response, next)
    {
        try
        {
            response.json({123: 123});
        }
        catch(e)
        {
            next(e);
        }
    }

    async googleAuthenticate(request, response, next)
    {
        try
        {
            passport.authenticate('google', {failureRedirect: '/'})
        }
        catch(e)
        {
            next(e);
        }
    }
}

module.exports = new UserController();