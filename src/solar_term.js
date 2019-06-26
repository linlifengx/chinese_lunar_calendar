const { base64ToBit, checkDate } =  require('./utils');

// 2bit代表日期 共48bit
// 48bit -> base64  8个
// 200年一共68种情况
const names = ['小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种',
    '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'];
const baseDate = [4, 19, 3, 18, 4, 19, 4, 19, 4, 20, 4, 20, 6, 22, 6, 22, 6, 22, 7, 22, 6, 21, 6, 21];

const table = [];

function decompressData() {
    const codeStr = 'ABCDAECDAECDFGHIJKHILKMILABNOABNOAENOAENOAEPQRGSTUGSTLAVTOAWXOAWXOAYXOAYZOabcdebcQUfgThijkOilXOimXOimXOimcOnocdpqcQrsgktujkvumXvumXvumcvumcvwocxyqcz0sj10s213u243um43um53wm56wq567q589s+/0s~/3u~!3u@#3um';
    const groupsStr = 'paaqmqqpqaquqqqqqvruruqq6qWaWZqlqaqqqqqqlaaqmqqppaaqqqqqqrququqqqqWaWZaVlaaampqlpaaqqqqplaWampqlqaququqqqqWZWZVVlaWaWZqlqqVZWZVVlaWaWZaVlaaqmpqpqmVZVZVVVaWaWZaVlaWampqpqlVZVZVVqVVZVVVVVaWZWZVVqVVVVVVVVaVZWZVVpaaqmpqpqVFVVVVVVaVZVZVVlaWaWZalpaaampqppVFVRVVVVWVZVZVVlaWaWpqlpVFVRVVUVVVZVVVVVaWZWZaVVFVZVVVVVFVVVVVVpVFVRUVUVFFVVVVVpVFFRUVUVFFVRVVVlVBFRUVUUFFVRVVVlVBFBEVUUFFVRVVUlVBFBEVQUFFFRUVUlVBFBEFQUFBFRUVUlVBEBEFAQFBFBEVUVVBEBEFAVVVVVVVVQFBFBEVQVVBEBEAAVVAEAEAAQFBFBEFQUFBFBUVUQFBEBEFAUFBFBEVUVQAEAAAAAFBEBEFAVQAAAAAAAFBEBEAAVAAAAAAAAFBEAEAA';
    const groups = [];
    for (let i = 0; i < groupsStr.length; i += 8) {
        const groupBitStr = base64ToBit(groupsStr.substr(i, 8));
        const group = [];
        for (let j = 0; j < groupBitStr.length; j += 2) {
            group.push(+`0b${groupBitStr.substr(j, 2)}`);
        }
        groups.push(group);
    }
    const codeMapStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/~!@#';
    for (let i = 0; i < codeStr.length; i++) {
        table.push(groups[codeMapStr.indexOf(codeStr[i])]);
    }
}

decompressData();

function getSolarTerm(year, month, date) {
    year = Math.floor(+year);
    month = Math.floor(+month);
    date = Math.floor(+date);
    checkDate(year, month, date);
    const index = (month - 1) * 2 + (date < 15 ? 0 : 1);
    const d = baseDate[index] + table[year - 1901][index];
    if (date == d) {
        return names[index];
    } else {
        return null;
    }
}

module.exports = { getSolarTerm };
