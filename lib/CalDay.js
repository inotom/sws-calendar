'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalDay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** @prettier */

var _helpers = require('./helpers.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A day object
 */
var CalDay = exports.CalDay = function () {
  /**
   * @constructor
   * @param {number} dayWeek Index of week. Sunday is 0,
   * @param {number} weekLineRows Index of calendar table row.
   * @param {Object} [options] Unrequired arguments
   */
  function CalDay(dayWeek, weekLineRows) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, CalDay);

    this.isBlank = (0, _helpers.existy)(opts.isBlank) ? opts.isBlank : true;
    this.day = opts.day || 0;
    this.dayWeek = dayWeek;
    this.weekLineRows = weekLineRows;
    this.isToday = opts.isToday || false;
    this.holidayName = opts.holidayName || null;
    this.isFurikae = opts.isFurikae || false;
  }

  _createClass(CalDay, null, [{
    key: 'createNew',
    value: function createNew(dayWeek, weekLineRows) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return new CalDay(dayWeek, weekLineRows, opts);
    }
  }]);

  return CalDay;
}();