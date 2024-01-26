/** @prettier */

import { existy } from './helpers';

interface CalDayOptions {
  day?: number;
  isBlank?: boolean;
  isToday?: boolean;
  holidayName?: string;
  isFurikae?: boolean;
}

/**
 * A day object
 */
export class CalDay {
  isBlank = true;
  day = 0;
  dayWeek: number;
  weekLineRows: number;
  isToday = false;
  holidayName = '';
  isFurikae = false;

  /**
   * @constructor
   * @param {number} dayWeek Index of week. Sunday is 0,
   * @param {number} weekLineRows Index of calendar table row.
   * @param {Object} [options] Unrequired arguments
   */
  constructor(dayWeek: number, weekLineRows: number, opts = {} as CalDayOptions) {
    this.isBlank = existy(opts.isBlank) ? !!opts.isBlank : true;
    this.day = opts.day || 0;
    this.dayWeek = dayWeek;
    this.weekLineRows = weekLineRows;
    this.isToday = opts.isToday || false;
    this.holidayName = opts.holidayName || '';
    this.isFurikae = opts.isFurikae || false;
  }

  static createNew(dayWeek: number, weekLineRows: number, opts = {} as CalDayOptions): CalDay {
    return new CalDay(dayWeek, weekLineRows, opts);
  }
}
