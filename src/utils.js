function base64ToBit(base64Str) {
    const base64CodeMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const result = [];
    for (let i = 0; i < base64Str.length; i++) {
        let n = base64CodeMap.indexOf(base64Str[i]);
        result.push(n.toString(2).padStart(6, '0'));
    }
    return result.join('');
}

function checkDate(year, month, date) {
    if (year < 1901 || year > 2100) {
        throw new Error('Invalid Year');
    }
    if (month < 1 || month > 12) {
        throw new Error('Invalid Month');
    }
    if (date < 1 || date > 31) {
        throw new Error('Invalid Date');
    }
    if ([4, 6, 9, 11].indexOf(month) != -1 && date > 30) {
        throw new Error('Invalid Date');
    }
    if (month == 2) {
        if (date > 29) {
            throw new Error('Invalid Date');
        } else {
            let isLeap = false;
            if (year % 400 == 0) {
                isLeap = true
            } else if (year % 4 == 0 && year % 100 != 0) {
                isLeap = true;
            }
            if (!isLeap && date > 28) {
                throw new Error('Invalid Date');
            }
        }
    }
}

module.exports = {
    base64ToBit,
    checkDate,
};