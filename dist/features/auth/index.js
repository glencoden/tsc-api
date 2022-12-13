"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOrm = exports.authRouter = void 0;
require("dotenv/config");
const AuthOrm_1 = __importDefault(require("./AuthOrm"));
var authRouter_1 = require("./authRouter");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return authRouter_1.authRouter; } });
const { DB_USER, DB_PASSWORD, DB_HOST, AUTH_DB_NAME } = process.env;
const databaseName = AUTH_DB_NAME || 'tsc_oauth2';
const databaseUrl = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${databaseName}`;
exports.authOrm = new AuthOrm_1.default({ databaseUrl });
//# sourceMappingURL=index.js.map