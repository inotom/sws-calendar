/** @prettier */

import { CalDay } from '../src/CalDay';
import { SwsCalendar } from '../src/index';

const getHoliday = (year: number, month: number, holidayName: string): CalDay | undefined => {
  return SwsCalendar.createNew(year, month)
    .get()
    .find((d) => d.holidayName === holidayName);
};

describe('SwsCalendar class', () => {
  describe('holidays', () => {
    describe('in Jan', () => {
      test('元旦は1月1日', async () => {
        const calDay = getHoliday(2018, 1, '元旦');
        expect(calDay?.day).toBe(1);
      });
      test('1999年以前の成人の日は1月15日', async () => {
        const calDay = getHoliday(1999, 1, '成人の日');
        expect(calDay?.day).toBe(15);
      });
      test('2000年以降の成人の日は1月の第2月曜日', async () => {
        const calDay = getHoliday(2000, 1, '成人の日');
        expect(calDay?.dayWeek).toBe(1);
        expect(calDay?.weekLineRows).toBe(2);
      });
      test('建国記念日は2月11日', async () => {
        const calDay = getHoliday(2018, 2, '建国記念の日');
        expect(calDay?.day).toBe(11);
      });
      test('2050年の春分の日は3月20日', async () => {
        const calDay = getHoliday(2050, 3, '春分の日');
        expect(calDay?.day).toBe(20);
      });
      test('1988年以前の天皇誕生日は4月29日', async () => {
        const calDay = getHoliday(1988, 4, '天皇誕生日');
        expect(calDay?.day).toBe(29);
      });
      test('1989年から2018年までの天皇誕生日は12月23日', async () => {
        const calDay1 = getHoliday(1989, 12, '天皇誕生日');
        expect(calDay1?.day).toBe(23);
        const calDay2 = getHoliday(2018, 12, '天皇誕生日');
        expect(calDay2?.day).toBe(23);
      });
      test('2020年以降の天皇誕生日は2月23日', async () => {
        const calDay = getHoliday(2020, 2, '天皇誕生日');
        expect(calDay?.day).toBe(23);
      });
      test('1989年から2006年までのみどりの日は4月29日', async () => {
        const calDay1 = getHoliday(1989, 4, 'みどりの日');
        expect(calDay1?.day).toBe(29);
        const calDay2 = getHoliday(2006, 4, 'みどりの日');
        expect(calDay2?.day).toBe(29);
      });
      test('2007年以降のみどりの日は5月4日', async () => {
        const calDay = getHoliday(2007, 5, 'みどりの日');
        expect(calDay?.day).toBe(4);
      });
      test('1986年以降2006年以前の国民の休日は5月4日', async () => {
        const calDay1 = getHoliday(1986, 5, '国民の休日');
        expect(calDay1?.day).toBe(4);
        const calDay2 = getHoliday(2006, 5, '国民の休日');
        expect(calDay2?.day).toBe(4);
      });
      test('2007年以降の昭和の日は4月29日', async () => {
        const calDay = getHoliday(2007, 4, '昭和の日');
        expect(calDay?.day).toBe(29);
      });
      test('憲法記念日は5月3日', async () => {
        const calDay = getHoliday(2018, 5, '憲法記念日');
        expect(calDay?.day).toBe(3);
      });
      test('こどもの日は5月5日', async () => {
        const calDay = getHoliday(2018, 5, 'こどもの日');
        expect(calDay?.day).toBe(5);
      });
      test('1996年以降2002年以前の海の日は7月20日', async () => {
        const calDay1 = getHoliday(1996, 7, '海の日');
        expect(calDay1?.day).toBe(20);
        const calDay2 = getHoliday(2002, 7, '海の日');
        expect(calDay2?.day).toBe(20);
      });
      test('2003年以降2019年以前の海の日は7月第3月曜日', async () => {
        const calDay1 = getHoliday(2003, 7, '海の日');
        expect(calDay1?.dayWeek).toBe(1);
        expect(calDay1?.weekLineRows).toBe(3);
        const calDay2 = getHoliday(2019, 7, '海の日');
        expect(calDay2?.dayWeek).toBe(1);
        expect(calDay2?.weekLineRows).toBe(2);
      });
      test('2020年の海の日は7月23日', async () => {
        const calDay = getHoliday(2020, 7, '海の日');
        expect(calDay?.day).toBe(23);
      });
      test('2021年の海の日は7月22日', async () => {
        const calDay = getHoliday(2021, 7, '海の日');
        expect(calDay?.day).toBe(22);
      });
      test('2022年以降の海の日は7月第3月曜日', async () => {
        const calDay = getHoliday(2022, 7, '海の日');
        expect(calDay?.dayWeek).toBe(1);
        expect(calDay?.weekLineRows).toBe(3);
      });
      test('2016年以降2019年以前の山の日は8月11日', async () => {
        const calDay1 = getHoliday(2016, 8, '山の日');
        expect(calDay1?.day).toBe(11);
        const calDay2 = getHoliday(2019, 8, '山の日');
        expect(calDay2?.day).toBe(11);
      });
      test('2020年の山の日は8月10日', async () => {
        const calDay = getHoliday(2020, 8, '山の日');
        expect(calDay?.day).toBe(10);
      });
      test('2021年の山の日は8月8日', async () => {
        const calDay = getHoliday(2021, 8, '山の日');
        expect(calDay?.day).toBe(8);
      });
      test('2022年以降の山の日は8月11日', async () => {
        const calDay = getHoliday(2022, 8, '山の日');
        expect(calDay?.day).toBe(11);
      });
      test('2002年以前の敬老の日は9月15日', async () => {
        const calDay = getHoliday(2002, 9, '敬老の日');
        expect(calDay?.day).toBe(15);
      });
      test('2003年以降の敬老の日は9月第3月曜日', async () => {
        const calDay = getHoliday(2003, 9, '敬老の日');
        expect(calDay?.dayWeek).toBe(1);
        expect(calDay?.weekLineRows).toBe(2);
      });
      test('2050年の秋分の日は9月23日', async () => {
        const calDay = getHoliday(2050, 9, '秋分の日');
        expect(calDay?.day).toBe(23);
      });
      test('1999年以前の体育の日は10月10日', async () => {
        const calDay = getHoliday(1999, 10, '体育の日');
        expect(calDay?.day).toBe(10);
      });
      test('2000年以降2019年以前の体育の日は10月第2月曜日', async () => {
        const calDay1 = getHoliday(2000, 10, '体育の日');
        expect(calDay1?.dayWeek).toBe(1);
        expect(calDay1?.weekLineRows).toBe(1);
        const calDay2 = getHoliday(2019, 10, '体育の日');
        expect(calDay2?.dayWeek).toBe(1);
        expect(calDay2?.weekLineRows).toBe(2);
      });
      test('2020年のスポーツの日は7月24日', async () => {
        const calDay = getHoliday(2020, 7, 'スポーツの日');
        expect(calDay?.day).toBe(24);
      });
      test('2021年のスポーツの日は7月23日', async () => {
        const calDay = getHoliday(2021, 7, 'スポーツの日');
        expect(calDay?.day).toBe(23);
      });
      test('2022年以降のスポーツの日は10月第2月曜日', async () => {
        const calDay = getHoliday(2022, 10, 'スポーツの日');
        expect(calDay?.dayWeek).toBe(1);
        expect(calDay?.weekLineRows).toBe(2);
      });
      test('文化の日は11月3日', async () => {
        const calDay = getHoliday(2018, 11, '文化の日');
        expect(calDay?.day).toBe(3);
      });
      test('勤労感謝の日は11月23日', async () => {
        const calDay = getHoliday(2018, 11, '勤労感謝の日');
        expect(calDay?.day).toBe(23);
      });
    });
  });
});
