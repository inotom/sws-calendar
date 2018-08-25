/** @prettier */

import { existy } from './helpers.js';

/**
 * A day object
 */
export class CalDay {
  /**
   * @constructor
   * @param {number} dayWeek Index of week. Sunday is 0,
   * @param {number} weekLineRows Index of calendar table row.
   * @param {Object} [options] Unrequired arguments
   */
  constructor(dayWeek, weekLineRows, opts = {}) {
    this.isBlank = existy(opts.isBlank) ? opts.isBlank : true;
    this.day = opts.day || 0;
    this.dayWeek = dayWeek;
    this.weekLineRows = weekLineRows;
    this.isToday = opts.isToday || false;
    this.holidayName = opts.holidayName || null;
    this.isFurikae = opts.isFurikae || false;
  }

  static createNew(dayWeek, weekLineRows, opts = {}) {
    return new CalDay(dayWeek, weekLineRows, opts);
  }
}
