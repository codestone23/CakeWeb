import {DataTypes} from 'sequelize';

export const Bills = (sequelize) => sequelize.define('Bills',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_client: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    notice: {
        type: DataTypes.STRING,
        allowNull: false
    },
    delivery_date: {
        type: DataTypes.TIME,
        allowNull: false
    },
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});