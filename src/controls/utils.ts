export function isValidDecimal(inputValue: string) {
    if (inputValue === '') return true;
    let hasDecimal = false;
    for (let i = 0; i < inputValue.length; i++) {
        const char = inputValue[i];
        if (char === '.') {
            if (hasDecimal) return false;
            hasDecimal = true;
        } else if (char < '0' || char > '9') {
            return false;
        }
    }
    return true;
}
