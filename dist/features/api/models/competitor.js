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
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: sequelize_1.DataTypes.JSON
    },
    club: sequelize_1.DataTypes.STRING,
    results: sequelize_1.DataTypes.JSON,
    deleted: sequelize_1.DataTypes.DATE
};
//# sourceMappingURL=competitor.js.map