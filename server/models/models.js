const sequelize = require('../databse/db');
const {DataTypes, Model} = require('sequelize');

class User      extends Model {}
class Order     extends Model {}
class Supply    extends Model {}
class Carrier   extends Model {}
class Product   extends Model {}

let modelsSetUp = (sequelize) =>
{
    User.init
    (
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            email: { type: DataTypes.STRING, unique: true, allowNull: false },
            password: { type: DataTypes.STRING, unique: true, allowNull: false },
            role: { type: DataTypes.STRING, defaultValue: "USER" },
            phone: { type: DataTypes.STRING, allowNull: true },
            company: { type: DataTypes.STRING, allowNull: true }
        },
        {
            sequelize: sequelize,
            modelName: "user",
            tableName: "users",
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

    Supply.init
    (
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            address: { type: DataTypes.STRING, allowNull: false },
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

    Carrier.init
    (
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            city: { type: DataTypes.STRING, allowNull: false },
            name: { type: DataTypes.STRING, allowNull: false },
            is_busy: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
        },
        {
            sequelize : sequelize,
            modelName: "carrier",
            tableName: "carriers",
            timestamps: false
        }
    );

    Product.init
    (
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            name: { type: DataTypes.STRING, allowNull: false, unique: true },
            amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            price: { type: DataTypes.DECIMAL, allowNull: false }
        },
        {
            sequelize : sequelize,
            modelName: "product",
            tableName: "products",
            timestamps: false
        }
    )

    User.hasMany(Order, {as: 'user_orders', foreignKey: 'user_id', sourceKey: 'id'});
    Product.hasMany(Order, {as: 'product_orders', foreignKey: 'product_id', sourceKey: 'id'});
    Supply.hasMany(Order, {as: 'supply_orders', foreignKey: 'supply_id', sourceKey: 'id'});
    Carrier.hasMany(Supply, {as: 'carrier_supplies', foreignKey: 'carrier_id', sourceKey: 'id'});

    return {User, Carrier, Supply, Order, Product}
}

module.exports.Models = (sequelize) => modelsSetUp(sequelize);