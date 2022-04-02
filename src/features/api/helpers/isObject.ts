export function isObject(val: any): Boolean {
    return val !== null && typeof val !== 'function' && typeof val === 'object' && !Array.isArray(val);
}