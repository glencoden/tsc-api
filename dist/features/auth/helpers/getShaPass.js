"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShaPass = void 0;
const crypto_1 = __importDefault(require("crypto"));
function getShaPass(password) {
    return crypto_1.default.createHash('sha256').update(password).digest('hex');
}
exports.getShaPass = getShaPass;
//# sourceMappingURL=getShaPass.js.map