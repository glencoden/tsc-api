"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: sequelize_1.DataTypes.STRING,
    date: sequelize_1.DataTypes.STRING,
    place: sequelize_1.DataTypes.STRING,
    host: sequelize_1.DataTypes.STRING,
    start: sequelize_1.DataTypes.STRING,
    final: sequelize_1.DataTypes.BOOLEAN,
    disciplines: sequelize_1.DataTypes.JSON,
    gymnastics: sequelize_1.DataTypes.JSON,
    competitorIds: sequelize_1.DataTypes.JSON,
    deleted: sequelize_1.DataTypes.DATE
};
//# sourceMappingURL=event.js.map