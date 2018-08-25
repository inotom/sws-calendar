'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwsCalendar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** @prettier */

var _helpers = require('./helpers.js');

var _CalDay = require('./CalDay.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Numbers of days in each months
 *
 * February is set to 0 in order to deal with a leap year.
 */
var NUM_DAYS = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * set previous month blank days
 * @param {number} dayWeek Index of week. Sunday is 0.
 * @param {Array.<Object>} calData
 */
var setFirstWeekBlankLine = function setFirstWeekBlankLine(dayWeek, calData) {
  for (var i = 0; i < dayWeek; i++) {
    var calDay = _CalDay.CalDay.createNew(i, 0);
    calData.push(calDay);
  }
};

/**
 * set next month blank days
 * @param {number} dayWeek Index of week. Sunday is 0.
 * @param {number} month Number of month.
 * @param {Array.<Object>} calData
 * @return {number} weekLineRows
 */
var setEndWeekBlankLine = function setEndWeekBlankLine(dayWeek, firstDayWeek, numDays, month, calData) {
  var endWeekLen = dayWeek === 0 && month !== 2 ? 7 : dayWeek;
  var weekLineRows = parseInt((firstDayWeek + numDays) / 7, 10);
  for (var i = 0; i < 7 - endWeekLen; i++) {
    var calDay = _CalDay.CalDay.createNew(dayWeek, weekLineRows);
    calData.push(calDay);
    dayWeek = dayWeek === 6 ? 0 : dayWeek + 1;
  }
  return weekLineRows;
};

/**
 * set 5th row blank line
 * @param {Array.<Object>} calData
 */
var setLastBlankLine = function setLastBlankLine(calData) {
  for (var i = 0; i < 7; i++) {
    var calDay = _CalDay.CalDay.createNew(i, 5);
    calData.push(calDay);
  }
};

/**
 * Checking whether it is a leap year. (うるう年)
 * @param {number} year Number of year.
 * @return boolean
 */
var checkLeap = function checkLeap(year) {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      return year % 400 === 0 ? true : false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

/**
 * Get vernal equinox day. (春分の日)
 * @param {number} year Number of year.
 * @return {number} Number of vernal equinox day.
 */
var getVernal = function getVernal(year) {
  var v = year < 2000 ? 2213 : 2089;
  return Math.floor((31 * year + v) / 128) - Math.floor(year / 4) + Math.floor(year / 100);
};

/**
 * Get autumnal equinox day. (秋分の日)
 * @param {number} year Number of year.
 * @return {number} Number of autumnal equinox day.
 */
var getAutumnal = function getAutumnal(year) {
  var v = year < 2000 ? 2525 : 2395;
  return Math.floor((31 * year + v) / 128) - Math.floor(year / 4) + Math.floor(year / 100);
};

/**
 * Get number of days in a month.
 * @param {number} year Number of year.
 * @param {number} month Number of month. January is 1.
 * @return number Number of days in a month.
 */
var getNumberOfDays = function getNumberOfDays(year, month) {
  if (month === 2) {
    return checkLeap(year) ? 29 : 28;
  } else {
    return NUM_DAYS[month - 1];
  }
};

/**
 * Checking the day is today.
 * @param {number} year Number of year.
 * @param {number} month Number of month. January is 1.
 * @param {number} day Number of day.
 * @return {boolean}
 */
var checkToday = function checkToday(year, month, day) {
  var today = new Date();
  if (year === today.getFullYear() && month === today.getMonth() + 1) {
    return day === today.getDate();
  } else {
    return false;
  }
};

/**
 * Checking if the day is alternate holiday.
 * @param {number} dayWeek Index of week. Sunday is 0.
 * @param {number} day Number of day.
 * @param {Array.<string>} holidays Array of holiday label string.
 * @return {boolean}
 */
var checkAltHoliday = function checkAltHoliday(dayWeek, day, holidays, index) {
  // 曜日が月曜日で祝日でなくかつ前日が祝日
  // 曜日が火曜日で祝日でなくかつ前日・前々日が祝日
  // 曜日が水曜日で祝日でなくかつ前日・前々日・前々前日が祝日
  return dayWeek === 1 && holidays[index] && !holidays[day] || index > 1 && dayWeek === 2 && holidays[index - 1] && holidays[index] && !holidays[day] || index > 2 && dayWeek === 3 && holidays[index - 2] && holidays[index - 1] && holidays[index] && !holidays[day] ? true : false;
};

/**
 * Get array of holiday label string.
 * @param {number} year Number of year.
 * @param {number} month Number of month. January is 1.
 * @param {number} numDays Number of days in a month.
 * @return {Array.<string>} Array of holiday label.
 */
var getHolidays = function getHolidays(year, month, numDays) {
  var weekRow = 0;
  var holidays = [null];
  for (var i = 1; i < numDays + 1; i++) {
    var theDay = new Date(Date.UTC(year, month - 1, i));
    holidays[i] = null;
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
    } else if (month === 7 && weekRow === 3 && theDay.getDay() === 1 && year >= 2003 && year !== 2020) {
      // 海の日
      holidays[i] = '海の日';
    } else if (month === 8 && i === 10 && year === 2020) {
      // 山の日
      holidays[i] = '山の日';
    } else if (month === 8 && i === 11 && year >= 2016 && year !== 2020) {
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
    } else if (month === 10 && weekRow === 2 && theDay.getDay() === 1 && year >= 2000 && year <= 2019) {
      // 体育の日
      holidays[i] = '体育の日';
    } else if (month === 7 && i === 24 && year === 2020) {
      // スポーツの日
      holidays[i] = 'スポーツの日';
    } else if (month === 10 && weekRow === 2 && theDay.getDay() === 1 && year >= 2021) {
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

var SwsCalendar = exports.SwsCalendar = function () {
  /**
   * @constructor
   * @param {number} year Number of year.
   * @param {number} month Number of month. January is 1.
   */
  function SwsCalendar(year, month) {
    _classCallCheck(this, SwsCalendar);

    if ((0, _helpers.existy)(year) && (0, _helpers.existy)(month)) {
      this.year = year;
      this.month = month;
    } else {
      var now = new Date();
      this.year = now.getFullYear();
      this.month = now.getMonth() + 1;
    }

    this.set(this.year, this.month);
  }

  /**
   * get calData
   * @return {Array.<Object>}
   */


  _createClass(SwsCalendar, [{
    key: 'get',
    value: function get() {
      return this.calData;
    }

    /**
     * set calData to given year and month
     * @param {number} year Number of year.
     * @param {number} month Number of month.
     * @return {SwsCalendar}
     */

  }, {
    key: 'set',
    value: function set(year, month) {
      // initialize calData
      this.calData = [];

      var numDays = getNumberOfDays(year, month);
      var firstDate = new Date(Date.UTC(year, month - 1, 1));
      var dayWeek = firstDate.getDay();
      var firstDayWeek = firstDate.getDay();
      var holidays = getHolidays(year, month, numDays);

      setFirstWeekBlankLine(dayWeek, this.calData);

      // set days
      for (var i = 0; i < numDays; i++) {
        var day = i + 1;
        var options = {
          isBlank: false,
          day: day,
          isToday: checkToday(year, month, day),
          holidayName: holidays[day],
          isFurikae: checkAltHoliday(dayWeek, day, holidays, i)
        };
        var calDay = _CalDay.CalDay.createNew(dayWeek, parseInt((firstDayWeek + day - 1) / 7, 10), options);
        this.calData.push(calDay);
        dayWeek = dayWeek === 6 ? 0 : dayWeek + 1;
      }

      var weekLineRows = setEndWeekBlankLine(dayWeek, firstDayWeek, numDays, month, this.calData);

      if (weekLineRows >= 4 && weekLineRows < 5 || weekLineRows === 5 && dayWeek === 0 && numDays > 29) {
        setLastBlankLine(this.calData);
      }
      return this;
    }

    /**
     * set calData to next month
     */

  }, {
    key: 'next',
    value: function next() {
      this.year = this.month === 12 ? this.year + 1 : this.year;
      this.month = this.month === 12 ? 1 : this.month + 1;
      this.set(this.year, this.month);
    }

    /**
     * set calData to previous month
     */

  }, {
    key: 'prev',
    value: function prev() {
      this.year = this.month === 1 ? this.year - 1 : this.year;
      this.month = this.month === 1 ? 12 : this.month - 1;
      this.set(this.year, this.month);
    }

    /**
     * get current year
     * @return {number} Number of year.
     */

  }, {
    key: 'getYear',
    value: function getYear() {
      return this.year;
    }

    /**
     * get current month
     * @return {number} Number of month.
     */

  }, {
    key: 'getMonth',
    value: function getMonth() {
      return this.month;
    }
  }], [{
    key: 'createNew',
    value: function createNew(year, month) {
      return new SwsCalendar(year, month);
    }
  }]);

  return SwsCalendar;
}();