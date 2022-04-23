const bcrypt = require('bcrypt');
const uuid = require('uuid');

const sequelize = require('../databse/db');
const config = require('../default.json');
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const UserDto = require('../dto/userDto');
const {User} = require('../models/models').Models(sequelize);
const ApiError = require('../error/ApiError')

class UserService
{
    async register(email, password)
    {
        let candidate = await User.findOne({ where: {email: email}});

        if(candidate)
        {
            throw ApiError.BadRequest(`Пользователь с указанной почтой уже существует:  ${email}`);
        }

        let hashPassword = await bcrypt.hash(password, 3);
        let activationLink = uuid.v4();

        let completeActivationLink = `${config.server.api_url}/api/user/activate/${activationLink}`;

        let user = await User.create({email: email, password: hashPassword, activationLink: activationLink});
        await mailService.sendActivationMail(email, completeActivationLink);

        let userDto = new UserDto(user);
        let tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async activate(activationLink)
    {
        let user = await User.findOne({ where: {activationLink: activationLink}});
        console.log(user);
        if(!user)
        {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.is_activated = true;
        await user.save();
    }

    async login(email, password)
    {
        const user = await User.findOne({where: {email: email}});
        if(!user)
        {
            throw ApiError.BadRequest(`Пользователь с таким email не найден: ${email}`);
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals)
        {
            throw ApiError.BadRequest(`Неверный пароль`);
        }

        if(user.is_activated === false)
        {
            throw ApiError.BadRequest(`Аккаунт не активирован`);
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async logout(refreshToken)
    {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken)
    {
        if(!refreshToken)
        {
            throw new ApiError.Unauthorized();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDb)
        {
            throw ApiError.Unauthorized();
        }

        const user = User.findByPk(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async reset(email)
    {
        let candidate = await User.findOne({ where: {email: email}});

        if(!candidate)
        {
            throw ApiError.BadRequest(`Пользователь с указанной почтой не существует:  ${email}`);
        }

        let resetLink = uuid.v4();
        let temporaryPassword = uuid.v4();

        let hashPassword = await bcrypt.hash(temporaryPassword, 3);

        let completeResetLink = `${config.server.api_url}/api/user/reset/${resetLink}`;

        let user = await User.update({password: hashPassword, resetLink: resetLink}, {where: {email: email}});
        await mailService.sendResetMail(email, completeResetLink, temporaryPassword);

        return { user: user, temporaryPassword: temporaryPassword};
    }

    async resetPassword(email, password)
    {
        let candidate = await User.findOne({ where: {email: email}});

        if(!candidate)
        {
            throw ApiError.BadRequest(`Пользователь с указанной почтой не существует:  ${email}`);
        }

        let hashPassword = await bcrypt.hash(password, 3);

        let user = await User.update({password: hashPassword}, {where: {email: email}});

        let userDto = new UserDto(user);
        let tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }
}

module.exports = new UserService();