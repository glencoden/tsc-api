export function numToFixed(num: number, length: number): string {
    let result = '';
    for (let i = 0; i < length; i ++) {
        result += 0;
    }
    result += String(num);
    return result.slice(-length);
}