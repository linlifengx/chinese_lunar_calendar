# 安装
npm install --save chinese-lunar-calendar

# 使用
```js
import { getLunar } from 'chinese-lunar-calendar'

// 传入1991年2月1日
console.log(getLunar(1991, 2, 1)); 
/*输出
{ 
  lunarMonth: 12,   //农历月份
  lunarDate: 17,    //农历日期
  isLeap: false,    //是否闰月
  solarTerm: null,  //节气，null代表没有
  lunarYear: '庚午年', //农历年份，年以正月初一开始
  zodiac: '马',     //生肖，生肖以正月初一开始
  dateStr: '腊月十七' //农历中文
}
*/

```

`dist/chinese_lunar_calendar.min.js` 是打包好的库，可用于浏览器可以直接引入，[简单例子](https://github.com/linlifengx/chinese_lunar_calendar/tree/master/test/test.html)

# 原理
这个库是通过抓取香港天文台 (http://data.weather.gov.hk/gts/time/calendar/text/T2019c.txt) 的数据，
把每年闰月月份和每月的大小保存下来编码压缩，先解压生成数据表，再通过查表算出农历日期和节气

# 注意!!
某些库和iPhone日历上2057-9-28是八月三十、2097-8-7是六月三十，
这里的数据和win10日历上2057-9-28是九月初一、2097-8-7是七月初一