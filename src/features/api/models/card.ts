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
    translations: DataTypes.JSON,
    example: DataTypes.STRING,
    priority: DataTypes.STRING,
    lastSeenAt: DataTypes.BIGINT,
    relatedIds: DataTypes.JSON,
} as ModelAttributes;