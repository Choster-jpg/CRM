const sequelize = require('../databse/db');
const {DataTypes, Model} = require('sequelize');

class User          extends Model {}
class Order         extends Model {}
class Supply        extends Model {}
class Carrier       extends Model {}
class Product       extends Model {}
class Token         extends Model {}
class UserSessions  extends Model {}

let modelsSetUp = (sequelize) =>
{
    UserSessions.init
    (
        {
            _id: { type: DataTypes.STRING, primaryKey: true, unique: true },
            expire: { type: DataTypes.DATE },
            session: { type: DataTypes.STRING }
        },
        {
            sequelize : sequelize,
            modelName: "UserSessions",
            tableName: "user_sessions",
            timestamps: false
        }
    );

    Carrier.init
    (
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            city: { type: DataTypes.STRING, allowNull: false },
            name: { type: DataTypes.STRING, allowNull: false },
            is_busy: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
            is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
        },
        {
            sequelize : sequelize,
            modelName: "carrier",
            tableName: "carriers",
            timestamps: false
        }
    );

    User.init
    (
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            email: { type: DataTypes.STRING, unique: true, allowNull: false },
            password: { type: DataTypes.STRING, unique: true, allowNull: true },
            name: { type: DataTypes.STRING, allowNull: false },
            last_name: { type: DataTypes.STRING, allowNull: false },
            display_name: { type: DataTypes.STRING, allowNull: true },
            image: { type: DataTypes.STRING(1000), allowNull: true },
            role: { type: DataTypes.STRING, defaultValue: "USER" },
            phone: { type: DataTypes.STRING, allowNull: true },
            company: { type: DataTypes.STRING, allowNull: true },
            is_activated: { type: DataTypes.BOOLEAN, defaultValue: false },
            activationLink: { type: DataTypes.STRING, allowNull: true },
            resetLink: { type: DataTypes.STRING, allowNull: true }
        },
        {
            sequelize: sequelize,
            modelName: "user",
            tableName: "users",
            timestamps: false
        }
    );

    Token.init
    (
        {
            user: { type: DataTypes.INTEGER, references: {model: User, key: "id"} },
            refreshToken: { type: DataTypes.STRING(1000), allowNull: false }
        },
        {
            sequelize : sequelize,
            modelName: "token",
            tableName: "token",
            timestamps: false
        }
    );

    Supply.init
    (
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            address_from: { type: DataTypes.STRING, allowNull: false },
            address_to: { type: DataTypes.STRING, allowNull: false },
            date: { type: DataTypes.DATE, allowNull: false },
            carrier_id: { type: DataTypes.INTEGER, references: {model: Carrier, key: "id"} }
        },
        {
            sequelize : sequelize,
            modelName: "supply",
            tableName: "supplies",
            timestamps: false
        }
    );

    Product.init
    (
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            name: { type: DataTypes.STRING, allowNull: false, unique: true },
            amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            price: { type: DataTypes.DECIMAL, allowNull: false },
            is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
        },
        {
            sequelize : sequelize,
            modelName: "product",
            tableName: "products",
            timestamps: false
        }
    );

    Order.init
    (
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            user_id: { type: DataTypes.INTEGER, references: {model: User, key: "id"} },
            product_id: { type: DataTypes.INTEGER, references: {model: Product, key: "id"} },
            supply_id: { type: DataTypes.INTEGER, references: {model: Supply, key: "id"} },
            amount: { type: DataTypes.INTEGER, allowNull: false },
            is_in_process: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
            is_declined: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
        },
        {
            sequelize : sequelize,
            modelName: "order",
            tableName: "orders",
            timestamps: false
        }
    );

    User.hasMany(Order, {as: 'user_orders', foreignKey: 'user_id', sourceKey: 'id', onDelete: "cascade"});
    User.hasMany(Token, {as: 'user_token', foreignKey: 'user', sourceKey: 'id', onDelete: "cascade"});
    Product.hasMany(Order, {as: 'product_orders', foreignKey: 'product_id', sourceKey: 'id', onDelete: "cascade"});
    Supply.hasMany(Order, {as: 'supply_orders', foreignKey: 'supply_id', sourceKey: 'id', onDelete: "cascade"});
    Carrier.hasMany(Supply, {as: 'carrier_supplies', foreignKey: 'carrier_id', sourceKey: 'id', onDelete: "cascade"});

    return {User, Carrier, Supply, Order, Product, Token}
}

module.exports.Models = (sequelize) => modelsSetUp(sequelize);