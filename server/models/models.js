const sequelize = require('../databse/db');
const {DataTypes, Model} = require('sequelize');

class User      extends Model {}
class Order     extends Model {}
class Supply  extends Model {}
class Carrier   extends Model {}
class Product   extends Model {}

let modelsSetUp = (sequelize) =>
{
    User.init
    (
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
            email: { type: DataTypes.STRING, unique: true, allowNull: false},
            password: { type: DataTypes.STRING, unique: true, allowNull: false},
            role: { type: DataTypes.STRING, defaultValue: "USER"},
            phone: { type: DataTypes.STRING, allowNull: true},
            company: { type: DataTypes.STRING, allowNull: true}
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
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
            user_id: { type: DataTypes.INTEGER, references: {model: User, key: "id"}},
            product_id: { type: DataTypes.INTEGER, references: {model: Product, key: "id"}},
            supply_id: { type: DataTypes.INTEGER, references: {model: Supply, key: "id"}},
            amount: { type: DataTypes.INTEGER, allowNull: false}
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
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
            address: {},
            date: {},
            carrier_id: { type: DataTypes.INTEGER, references: {model: Carrier, key: "id"}}
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
            id: {},
            city: {},
            name: {},
            is_busy: {}
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
            id: {},
            name: {},
            amount: {},
            price: {}

        },
        {
            sequelize : sequelize,
            modelName: "product",
            tableName: "products",
            timestamps: false
        }
    )
}
