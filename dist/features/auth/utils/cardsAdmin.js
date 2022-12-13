"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const getShaPass_1 = require("../helpers/getShaPass");
const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
exports.default = {
    firstName: 'Simon',
    lastName: 'Meyer',
    userName: ADMIN_USERNAME,
    email: 'simon.der.meyer@gmail.com',
    password: (0, getShaPass_1.getShaPass)(ADMIN_PASSWORD),
    isAdmin: true,
};
//# sourceMappingURL=cardsAdmin.js.map