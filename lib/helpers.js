'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @prettier */

/**
 * @param {any} val checked value.
 * @returns {boolean}
 */
var existy = exports.existy = function existy(val) {
  return typeof val !== 'undefined' && val !== null;
};