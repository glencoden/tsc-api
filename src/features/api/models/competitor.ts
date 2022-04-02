import { DataTypes, ModelAttributes } from 'sequelize';

export default {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.JSON
    },
    club: DataTypes.STRING,
    results: DataTypes.JSON,
    deleted: DataTypes.DATE
} as ModelAttributes;