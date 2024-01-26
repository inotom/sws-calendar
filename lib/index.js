"use strict";
/** @prettier */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwsCalendar = void 0;
const CalDay_1 = require("./CalDay");
const holidays_1 = require("./holidays");
__exportStar(require("./CalDay"), exports);
__exportStar(require("./holidays"), exports);
/**
 * Numbers of days in each months
 *
 * February is set to 0 in order to deal with a leap year.
 */
const NUM_DAYS = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
/**
 * set previous month blank days
 * @param {number} dayWeek Index of week. Sunday is 0.
 * @param {Array.<Object>} calData
 */
const setFirstWeekBlankLine = (dayWeek, calData) => {
    for (let i = 0; i < dayWeek; i++) {
        const calDay = CalDay_1.CalDay.createNew(i, 0);
        calData.push(calDay);
    }
};
/**
 * set next month blank days
 * @param {number} dayWeek Index of week. Sunday is 0.
 * @param {number} firstDayWeek Index of first day of week.
 * @param {number} numDays Number of days in the month.
 * @param {number} month Number of month.
 * @param {Array.<Object>} calData
 * @return {number} weekLineRows
 */
const setEndWeekBlankLine = (dayWeek, firstDayWeek, numDays, month, calData) => {
    const endWeekLen = dayWeek === 0 && month !== 2 ? 7 : dayWeek;
    const weekLineRows = Math.trunc((firstDayWeek + numDays) / 7);
    for (let i = 0; i < 7 - endWeekLen; i++) {
        const calDay = CalDay_1.CalDay.createNew(dayWeek, weekLineRows);
        calData.push(calDay);
        dayWeek = dayWeek === 6 ? 0 : dayWeek + 1;
    }
    return weekLineRows;
};
/**
 * set 5th row blank line
 * @param {Array.<Object>} calData
 */
const setLastBlankLine = (calData) => {
    for (let i = 0; i < 7; i++) {
        const calDay = CalDay_1.CalDay.createNew(i, 5);
        calData.push(calDay);
    }
};
/**
 * Checking whether it is a leap year. (うるう年)
 * @param {number} year Number of year.
 * @return boolean
 */
const checkLeap = (year) => {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            return year % 400 === 0 ? true : false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
};
/**
 * Get number of days in the month.
 * @param {number} year Number of year.
 * @param {number} month Number of month. January is 1.
 * @return number Number of days in a month.
 */
const getNumberOfDays = (year, month) => {
    if (month === 2) {
        return checkLeap(year) ? 29 : 28;
    }
    else {
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
const checkToday = (year, month, day) => {
    const today = new Date();
    if (year === today.getFullYear() && month === today.getMonth() + 1) {
        return day === today.getDate();
    }
    else {
        return false;
    }
};
/**
 * Checking if the day is alternate holiday.
 * @param {number} dayWeek Index of week. Sunday is 0.
 * @param {number} day Number of day.
 * @param {Array.<string>} holidays Array of holiday label string.
 * @param {number} index Calendar data(CalDay) list item index.
 * @return {boolean}
 */
const checkAltHoliday = (dayWeek, day, holidays, index) => {
    // 曜日が月曜日で祝日でなくかつ前日が祝日
    // 曜日が火曜日で祝日でなくかつ前日・前々日が祝日
    // 曜日が水曜日で祝日でなくかつ前日・前々日・前々前日が祝日
    return (dayWeek === 1 && holidays[index] && !holidays[day]) ||
        (index > 1 && dayWeek === 2 && holidays[index - 1] && holidays[index] && !holidays[day]) ||
        (index > 2 &&
            dayWeek === 3 &&
            holidays[index - 2] &&
            holidays[index - 1] &&
            holidays[index] &&
            !holidays[day])
        ? true
        : false;
};
class SwsCalendar {
    /**
     * @constructor
     * @param {number} year Number of year.
     * @param {number} month Number of month. January is 1.
     */
    constructor(year = -1, month = -1) {
        this.calData = [];
        if (year > 0 && month > 0) {
            this.year = year;
            this.month = month;
        }
        else {
            const now = new Date();
            this.year = now.getFullYear();
            this.month = now.getMonth() + 1;
        }
        this.set(this.year, this.month);
    }
    /**
     * get calData
     * @return {Array.<Object>}
     */
    get() {
        return this.calData;
    }
    /**
     * set calData to given year and month
     * @param {number} year Number of year.
     * @param {number} month Number of month.
     * @return {SwsCalendar}
     */
    set(year, month) {
        // initialize calData
        this.calData = [];
        const numDays = getNumberOfDays(year, month);
        const firstDate = new Date(Date.UTC(year, month - 1, 1));
        let dayWeek = firstDate.getDay();
        const firstDayWeek = firstDate.getDay();
        const holidays = (0, holidays_1.getHolidays)(year, month, numDays);
        setFirstWeekBlankLine(dayWeek, this.calData);
        // set days
        for (let i = 0; i < numDays; i++) {
            const day = i + 1;
            const options = {
                isBlank: false,
                day: day,
                isToday: checkToday(year, month, day),
                holidayName: holidays[day],
                isFurikae: checkAltHoliday(dayWeek, day, holidays, i),
            };
            const calDay = CalDay_1.CalDay.createNew(dayWeek, Math.trunc((firstDayWeek + day - 1) / 7), options);
            this.calData.push(calDay);
            dayWeek = dayWeek === 6 ? 0 : dayWeek + 1;
        }
        const weekLineRows = setEndWeekBlankLine(dayWeek, firstDayWeek, numDays, month, this.calData);
        if ((weekLineRows >= 4 && weekLineRows < 5) ||
            (weekLineRows === 5 && dayWeek === 0 && numDays > 29)) {
            setLastBlankLine(this.calData);
        }
        return this;
    }
    /**
     * set calData to next month
     */
    next() {
        this.year = this.month === 12 ? this.year + 1 : this.year;
        this.month = this.month === 12 ? 1 : this.month + 1;
        this.set(this.year, this.month);
    }
    /**
     * set calData to previous month
     */
    prev() {
        this.year = this.month === 1 ? this.year - 1 : this.year;
        this.month = this.month === 1 ? 12 : this.month - 1;
        this.set(this.year, this.month);
    }
    /**
     * get current year
     * @return {number} Number of year.
     */
    getYear() {
        return this.year;
    }
    /**
     * get current month
     * @return {number} Number of month.
     */
    getMonth() {
        return this.month;
    }
    static createNew(year = -1, month = -1) {
        return new SwsCalendar(year, month);
    }
}
exports.SwsCalendar = SwsCalendar;
