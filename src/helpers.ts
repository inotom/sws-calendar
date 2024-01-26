/** @prettier */

/**
 * @param {string | number | boolean | undefined | null } val checked value.
 * @returns {boolean}
 */
export const existy = (val: string | number | boolean | undefined | null): boolean => {
  return typeof val !== 'undefined' && val !== null;
};
