class ApiError extends Error
{
    constructor(status, message, errors = [])
    {
        super();
        this.status = status;
        this.message = message;
    }

    static BadRequest(message = "плохой запрос", errors = [])
    {
        return new ApiError(400, `Bad request: ${message}`, errors);
    }

    static Unauthorized(message = "не авторизован", errors = [])
    {
        return new ApiError(401, `Not authorized: ${message}`, errors);
    }

    static Forbidden(message = "отказано в доступе", errors = [])
    {
        return new ApiError(403, `Forbidden: ${message}`, errors);
    }

    static Internal(message = "внутренняя ошибка сервера", errors = [])
    {
        return new ApiError(500, `Internal: ${message}`, errors);
    }
}

module.exports = ApiError;