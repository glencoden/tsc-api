import { DataTypes, ModelAttributes } from 'sequelize';

export default {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    date: DataTypes.STRING,
    place: DataTypes.STRING,
    host: DataTypes.STRING,
    start: DataTypes.STRING,
    final: DataTypes.BOOLEAN,
    disciplines: DataTypes.JSON,
    gymnastics: DataTypes.JSON,
    competitorIds: DataTypes.JSON,
    deleted: DataTypes.DATE
} as ModelAttributes;