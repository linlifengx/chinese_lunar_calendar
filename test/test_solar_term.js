const { getSolarTerm } = require('../src/solar_term');
const solarTerms = require('./solarTerms.json');

function main() {
    for (let i = 1; ; i++) {
        const dateObj = new Date(1901, 0, i, 0, 0, 0, 0);
        const y = dateObj.getFullYear();
        const m = dateObj.getMonth() + 1;
        const d = dateObj.getDate();
        if (y > 2100) {
            break;
        }
        const str = `${y}-${m.toString().padStart(2, 0)}-${d.toString().padStart(2, 0)}`;
        const term1 = solarTerms[str];
        const term2 = getSolarTerm(y, m, d);
        if (term1) {
            if (term1 != term2) {
                console.error(y, m, d, term1, term2, str);
            }
        } else {
            if (term2) {
                console.error(y, m, d, term1, term2, str);
            }
        }
    }
}

main();