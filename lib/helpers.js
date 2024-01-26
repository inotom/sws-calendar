"use strict";
/** @prettier */
Object.defineProperty(exports, "__esModule", { value: true });
exports.existy = void 0;
/**
 * @param {string | number | boolean | undefined | null } val checked value.
 * @returns {boolean}
 */
const existy = (val) => {
    return typeof val !== 'undefined' && val !== null;
};
exports.existy = existy;
