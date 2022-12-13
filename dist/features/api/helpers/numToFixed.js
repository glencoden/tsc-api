"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numToFixed = void 0;
function numToFixed(num, length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += 0;
    }
    result += String(num);
    return result.slice(-length);
}
exports.numToFixed = numToFixed;
//# sourceMappingURL=numToFixed.js.map