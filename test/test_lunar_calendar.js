const { getLunar } = require('../src/lunar_calendar');
const dates = require('./dates.json');

const heavenlyStemStr = '甲乙丙丁戊己庚辛壬癸';
const earthlyBranchStr = '子丑寅卯辰巳午未申酉戌亥';

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
        const lunarDate1 = dates[str];
        const result = getLunar(y, m, d);
        const lunarDate2 = `${heavenlyStemStr.indexOf(result.lunarYear[0])}_${earthlyBranchStr.indexOf(result.lunarYear[1])}-${result.isLeap?'x':''}${result.lunarMonth}-${result.lunarDate}`;
        if (lunarDate1 != lunarDate2) {
            console.error(y, m, d, lunarDate1, lunarDate2, result);
        }
    }
    try {
        getLunar(1900, 12, 30);
    } catch (e) {
        console.log(e.message == 'Invalid Year');
    }
    try {
        getLunar(2101, 1, 1);
    } catch (e) {
        console.log(e.message == 'Invalid Year');
    }
    console.log(getLunar(1991, 2, 1));
}

main();