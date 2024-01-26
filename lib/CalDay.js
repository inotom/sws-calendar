"use strict";
/** @prettier */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalDay = void 0;
const helpers_1 = require("./helpers");
/**
 * A day object
 */
class CalDay {
    /**
     * @constructor
     * @param {number} dayWeek Index of week. Sunday is 0,
     * @param {number} weekLineRows Index of calendar table row.
     * @param {Object} [options] Unrequired arguments
     */
    constructor(dayWeek, weekLineRows, opts = {}) {
        this.isBlank = true;
        this.day = 0;
        this.isToday = false;
        this.holidayName = '';
        this.isFurikae = false;
        this.isBlank = (0, helpers_1.existy)(opts.isBlank) ? !!opts.isBlank : true;
        this.day = opts.day || 0;
        this.dayWeek = dayWeek;
        this.weekLineRows = weekLineRows;
        this.isToday = opts.isToday || false;
        this.holidayName = opts.holidayName || '';
        this.isFurikae = opts.isFurikae || false;
    }
    static createNew(dayWeek, weekLineRows, opts = {}) {
        return new CalDay(dayWeek, weekLineRows, opts);
    }
}
exports.CalDay = CalDay;
