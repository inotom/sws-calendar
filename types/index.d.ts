/** @prettier */
import { CalDay } from './CalDay';
export * from './CalDay';
export * from './holidays';
export declare class SwsCalendar {
    year: number;
    month: number;
    calData: CalDay[];
    /**
     * @constructor
     * @param {number} year Number of year.
     * @param {number} month Number of month. January is 1.
     */
    constructor(year?: number, month?: number);
    /**
     * get calData
     * @return {Array.<Object>}
     */
    get(): CalDay[];
    /**
     * set calData to given year and month
     * @param {number} year Number of year.
     * @param {number} month Number of month.
     * @return {SwsCalendar}
     */
    set(year: number, month: number): SwsCalendar;
    /**
     * set calData to next month
     */
    next(): void;
    /**
     * set calData to previous month
     */
    prev(): void;
    /**
     * get current year
     * @return {number} Number of year.
     */
    getYear(): number;
    /**
     * get current month
     * @return {number} Number of month.
     */
    getMonth(): number;
    static createNew(year?: number, month?: number): SwsCalendar;
}
