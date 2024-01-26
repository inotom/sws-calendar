/** @prettier */

/**
 * Get vernal equinox day. (春分の日)
 * @param {number} year Number of year.
 * @return {number} Number of vernal equinox day.
 */
const getVernal = (year: number): number => {
  const v = year < 2000 ? 2213 : 2089;
  return Math.floor((31 * year + v) / 128) - Math.floor(year / 4) + Math.floor(year / 100);
};

/**
 * Get autumnal equinox day. (秋分の日)
 * @param {number} year Number of year.
 * @return {number} Number of autumnal equinox day.
 */
const getAutumnal = (year: number): number => {
  const v = year < 2000 ? 2525 : 2395;
  return Math.floor((31 * year + v) / 128) - Math.floor(year / 4) + Math.floor(year / 100);
};

/**
 * Get array of holiday label string.
 * @param {number} year Number of year.
 * @param {number} month Number of month. January is 1.
 * @param {number} numDays Number of days in the month.
 * @return {Array.<string>} Array of holiday label.
 */
export const getHolidays = (year: number, month: number, numDays: number): string[] => {
  let weekRow = 0;
  const holidays = [''];
  for (let i = 1; i < numDays + 1; i++) {
    const theDay = new Date(Date.UTC(year, month - 1, i));
    holidays[i] = '';
    if (theDay.getDay() === 1) {
      weekRow++;
    }

    if (month === 1 && i === 1) {
      // 元旦
      holidays[i] = '元旦';
    } else if (month === 1 && i === 15 && year < 2000) {
      // 成人の日
      holidays[i] = '成人の日';
    } else if (month === 1 && weekRow === 2 && theDay.getDay() === 1 && year >= 2000) {
      // 成人の日
      holidays[i] = '成人の日';
    } else if (month === 2 && i === 11) {
      // 建国記念の日
      holidays[i] = '建国記念の日';
    } else if (month === 3 && i === getVernal(year)) {
      // 春分
      holidays[i] = '春分の日';
    } else if (month === 4 && i === 29 && year <= 1988) {
      // 天皇誕生日
      holidays[i] = '天皇誕生日';
    } else if (month === 4 && i === 29 && year >= 1989 && year < 2007) {
      // みどりの日
      holidays[i] = 'みどりの日';
    } else if (month === 4 && i === 29 && year >= 2007) {
      // 昭和の日
      holidays[i] = '昭和の日';
    } else if (month === 5 && i === 3) {
      // 憲法記念日
      holidays[i] = '憲法記念日';
    } else if (month === 5 && i === 4 && year >= 1986 && year <= 2006) {
      // 国民の休日
      holidays[i] = '国民の休日';
    } else if (month === 5 && i === 4 && year >= 2007) {
      // みどりの日
      holidays[i] = 'みどりの日';
    } else if (month === 5 && i === 5) {
      // こどもの日
      holidays[i] = 'こどもの日';
    } else if (month === 7 && i === 23 && year === 2020) {
      // 海の日
      holidays[i] = '海の日';
    } else if (month === 7 && i === 20 && year >= 1996 && year <= 2002) {
      // 海の日
      holidays[i] = '海の日';
    } else if (month === 7 && i === 22 && year === 2021) {
      // 海の日
      holidays[i] = '海の日';
    } else if (
      month === 7 &&
      weekRow === 3 &&
      theDay.getDay() === 1 &&
      year >= 2003 &&
      year !== 2020 &&
      year !== 2021
    ) {
      // 海の日
      holidays[i] = '海の日';
    } else if (month === 8 && i === 10 && year === 2020) {
      // 山の日
      holidays[i] = '山の日';
    } else if (month === 8 && i === 8 && year === 2021) {
      // 山の日
      holidays[i] = '山の日';
    } else if (month === 8 && i === 11 && year >= 2016 && year !== 2020 && year !== 2021) {
      // 山の日
      holidays[i] = '山の日';
    } else if (month === 9 && i === 15 && year <= 2002) {
      // 敬老の日
      holidays[i] = '敬老の日';
    } else if (month === 9 && weekRow === 3 && theDay.getDay() === 1 && year >= 2003) {
      // 敬老の日
      holidays[i] = '敬老の日';
    } else if (month === 9 && i === getAutumnal(year)) {
      // 秋分の日
      holidays[i] = '秋分の日';
    } else if (month === 10 && i === 10 && year < 2000) {
      // 体育の日
      holidays[i] = '体育の日';
    } else if (
      month === 10 &&
      weekRow === 2 &&
      theDay.getDay() === 1 &&
      year >= 2000 &&
      year <= 2019
    ) {
      // 体育の日
      holidays[i] = '体育の日';
    } else if (month === 7 && i === 24 && year === 2020) {
      // スポーツの日
      holidays[i] = 'スポーツの日';
    } else if (month === 7 && i === 23 && year === 2021) {
      // スポーツの日
      holidays[i] = 'スポーツの日';
    } else if (month === 10 && weekRow === 2 && theDay.getDay() === 1 && year >= 2022) {
      // スポーツの日
      holidays[i] = 'スポーツの日';
    } else if (month === 11 && i === 3) {
      // 文化の日
      holidays[i] = '文化の日';
    } else if (month === 11 && i === 23) {
      // 勤労感謝の日
      holidays[i] = '勤労感謝の日';
    } else if (month === 12 && i === 23 && year >= 1989 && year <= 2018) {
      // 天皇誕生日
      holidays[i] = '天皇誕生日';
    } else if (month === 2 && i === 23 && year >= 2020) {
      // 天皇誕生日
      holidays[i] = '天皇誕生日';
    }
  }
  return holidays;
};
