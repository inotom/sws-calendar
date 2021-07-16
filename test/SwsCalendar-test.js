/** @prettier */

import assert from 'power-assert';
import { SwsCalendar } from '../src/index.js';

const getHoliday = (year, month, holidayName) => {
  return SwsCalendar.createNew(year, month)
    .get()
    .find(d => d.holidayName === holidayName);
};

describe('SwsCalendar class', function() {
  describe('holidays', function() {
    describe('in Jan', function() {
      it('元旦は1月1日', function() {
        const calDay = getHoliday(2018, 1, '元旦');
        assert(calDay.day === 1);
      });

      it('1999年以前の成人の日は1月15日', function() {
        const calDay = getHoliday(1999, 1, '成人の日');
        assert(calDay.day === 15);
      });

      it('2000年以降の成人の日は1月の第2月曜日', function() {
        const calDay = getHoliday(2000, 1, '成人の日');
        assert(calDay.dayWeek === 1);
        assert(calDay.weekLineRows === 2);
      });

      it('建国記念日は2月11日', function() {
        const calDay = getHoliday(2018, 2, '建国記念の日');
        assert(calDay.day === 11);
      });

      it('2050年の春分の日は3月20日', function() {
        const calDay = getHoliday(2050, 3, '春分の日');
        assert(calDay.day === 20);
      });

      it('1988年以前の天皇誕生日は4月29日', function() {
        const calDay = getHoliday(1988, 4, '天皇誕生日');
        assert(calDay.day === 29);
      });

      it('1989年から2018年までの天皇誕生日は12月23日', function() {
        const calDay1 = getHoliday(1989, 12, '天皇誕生日');
        assert(calDay1.day === 23);
        const calDay2 = getHoliday(2018, 12, '天皇誕生日');
        assert(calDay2.day === 23);
      });

      it('2020年以降の天皇誕生日は2月23日', function() {
        const calDay = getHoliday(2020, 2, '天皇誕生日');
        assert(calDay.day === 23);
      });

      it('1989年から2006年までのみどりの日は4月29日', function() {
        const calDay1 = getHoliday(1989, 4, 'みどりの日');
        assert(calDay1.day === 29);
        const calDay2 = getHoliday(2006, 4, 'みどりの日');
        assert(calDay2.day === 29);
      });

      it('2007年以降のみどりの日は5月4日', function() {
        const calDay = getHoliday(2007, 5, 'みどりの日');
        assert(calDay.day === 4);
      });

      it('1986年以降2006年以前の国民の休日は5月4日', function() {
        const calDay1 = getHoliday(1986, 5, '国民の休日');
        assert(calDay1.day === 4);
        const calDay2 = getHoliday(2006, 5, '国民の休日');
        assert(calDay2.day === 4);
      });

      it('2007年以降の昭和の日は4月29日', function() {
        const calDay = getHoliday(2007, 4, '昭和の日');
        assert(calDay.day === 29);
      });

      it('憲法記念日は5月3日', function() {
        const calDay = getHoliday(2018, 5, '憲法記念日');
        assert(calDay.day === 3);
      });

      it('こどもの日は5月5日', function() {
        const calDay = getHoliday(2018, 5, 'こどもの日');
        assert(calDay.day === 5);
      });

      it('1996年以降2002年以前の海の日は7月20日', function() {
        const calDay1 = getHoliday(1996, 7, '海の日');
        assert(calDay1.day === 20);
        const calDay2 = getHoliday(2002, 7, '海の日');
        assert(calDay2.day === 20);
      });

      it('2003年以降2019年以前の海の日は7月第3月曜日', function() {
        const calDay1 = getHoliday(2003, 7, '海の日');
        assert(calDay1.dayWeek === 1);
        assert(calDay1.weekLineRows === 3);
        const calDay2 = getHoliday(2019, 7, '海の日');
        assert(calDay2.dayWeek === 1);
        assert(calDay2.weekLineRows === 2);
      });

      it('2020年の海の日は7月23日', function() {
        const calDay = getHoliday(2020, 7, '海の日');
        assert(calDay.day === 23);
      });

      it('2021年の海の日は7月22日', function() {
        const calDay = getHoliday(2021, 7, '海の日');
        assert(calDay.day === 22);
      });

      it('2022年以降の海の日は7月第3月曜日', function() {
        const calDay = getHoliday(2022, 7, '海の日');
        assert(calDay.dayWeek === 1);
        assert(calDay.weekLineRows === 3);
      });

      it('2016年以降2019年以前の山の日は8月11日', function() {
        const calDay1 = getHoliday(2016, 8, '山の日');
        assert(calDay1.day === 11);
        const calDay2 = getHoliday(2019, 8, '山の日');
        assert(calDay2.day === 11);
      });

      it('2020年の山の日は8月10日', function() {
        const calDay = getHoliday(2020, 8, '山の日');
        assert(calDay.day === 10);
      });

      it('2021年の山の日は8月8日', function() {
        const calDay = getHoliday(2021, 8, '山の日');
        assert(calDay.day === 8);
      });

      it('2022年以降の山の日は8月11日', function() {
        const calDay = getHoliday(2022, 8, '山の日');
        assert(calDay.day === 11);
      });

      it('2002年以前の敬老の日は9月15日', function() {
        const calDay = getHoliday(2002, 9, '敬老の日');
        assert(calDay.day === 15);
      });

      it('2003年以降の敬老の日は9月第3月曜日', function() {
        const calDay = getHoliday(2003, 9, '敬老の日');
        assert(calDay.dayWeek === 1);
        assert(calDay.weekLineRows === 2);
      });

      it('2050年の秋分の日は9月23日', function() {
        const calDay = getHoliday(2050, 9, '秋分の日');
        assert(calDay.day === 23);
      });

      it('1999年以前の体育の日は10月10日', function() {
        const calDay = getHoliday(1999, 10, '体育の日');
        assert(calDay.day === 10);
      });

      it('2000年以降2019年以前の体育の日は10月第2月曜日', function() {
        const calDay1 = getHoliday(2000, 10, '体育の日');
        assert(calDay1.dayWeek === 1);
        assert(calDay1.weekLineRows === 1);
        const calDay2 = getHoliday(2019, 10, '体育の日');
        assert(calDay2.dayWeek === 1);
        assert(calDay2.weekLineRows === 2);
      });

      it('2020年のスポーツの日は7月24日', function() {
        const calDay = getHoliday(2020, 7, 'スポーツの日');
        assert(calDay.day === 24);
      });

      it('2021年のスポーツの日は7月23日', function() {
        const calDay = getHoliday(2021, 7, 'スポーツの日');
        assert(calDay.day === 23);
      });

      it('2022年以降のスポーツの日は10月第2月曜日', function() {
        const calDay = getHoliday(2022, 10, 'スポーツの日');
        assert(calDay.dayWeek === 1);
        assert(calDay.weekLineRows === 2);
      });

      it('文化の日は11月3日', function() {
        const calDay = getHoliday(2018, 11, '文化の日');
        assert(calDay.day === 3);
      });

      it('勤労感謝の日は11月23日', function() {
        const calDay = getHoliday(2018, 11, '勤労感謝の日');
        assert(calDay.day === 23);
      });
    });
  });
});
