const path = require('path');

module.exports = {
    entry: './src/lunar_calendar.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'chinese_lunar_calendar.min.js',
        libraryTarget: "umd",
        library: 'chinese_lunar_calendar',
        globalObject: 'this'
    }
};