module.exports = class UserDto
{
    email;
    id;
    name;
    last_name;
    isActivated;
    image;
    role;

    constructor(model)
    {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.is_activated;
        this.role = model.role;
        this.name = model.name;
        this.last_name = model.last_name;
        this.image = model.image;
    }
}