import {DataTypes} from 'sequelize';

export const CakeSizes = (sequelize) => sequelize.define('CakeSizes',{
    id_cake: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    size: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    old_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
},{
    timestamps: false
});