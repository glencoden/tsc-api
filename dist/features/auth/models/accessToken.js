"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    accessToken: sequelize_1.DataTypes.TEXT,
    userId: sequelize_1.DataTypes.INTEGER
};
//# sourceMappingURL=accessToken.js.map