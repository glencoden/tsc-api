"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiOrm = exports.apiRouter = void 0;
require("dotenv/config");
const ApiOrm_1 = __importDefault(require("./ApiOrm"));
var apiRouter_1 = require("./apiRouter");
Object.defineProperty(exports, "apiRouter", { enumerable: true, get: function () { return apiRouter_1.apiRouter; } });
const { DB_USER, DB_PASSWORD, DB_HOST, API_DB_NAME } = process.env;
const databaseName = API_DB_NAME || 'tsc';
const databaseUrl = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${databaseName}`;
exports.apiOrm = new ApiOrm_1.default({ databaseUrl });
//# sourceMappingURL=index.js.map