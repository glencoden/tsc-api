import { DataTypes, ModelAttributes } from 'sequelize';

export default {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    from: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    to: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    refreshMemoryStaleDate: DataTypes.DATE,
    refreshMemoryCardIds: DataTypes.JSON,
    settings: DataTypes.JSON,
} as ModelAttributes;