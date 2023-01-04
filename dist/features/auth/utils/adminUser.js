"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const getShaPass_1 = require("../helpers/getShaPass");
const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
exports.default = {
    userName: ADMIN_USERNAME,
    password: (0, getShaPass_1.getShaPass)(ADMIN_PASSWORD),
};
//# sourceMappingURL=adminUser.js.map