/** @prettier */
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
export declare class CalDay {
    isBlank: boolean;
    day: number;
    dayWeek: number;
    weekLineRows: number;
    isToday: boolean;
    holidayName: string;
    isFurikae: boolean;
    /**
     * @constructor
     * @param {number} dayWeek Index of week. Sunday is 0,
     * @param {number} weekLineRows Index of calendar table row.
     * @param {Object} [options] Unrequired arguments
     */
    constructor(dayWeek: number, weekLineRows: number, opts?: CalDayOptions);
    static createNew(dayWeek: number, weekLineRows: number, opts?: CalDayOptions): CalDay;
}
export {};
