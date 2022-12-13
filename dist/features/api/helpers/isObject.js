"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = void 0;
function isObject(val) {
    return val !== null && typeof val !== 'function' && typeof val === 'object' && !Array.isArray(val);
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map