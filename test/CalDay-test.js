/** @prettier */

import assert from 'power-assert';
import { CalDay } from '../src/CalDay.js';

describe('CalDay class', function() {
  describe('initialized', function() {
    describe('with no options', function() {
      let calDay;

      beforeEach(function() {
        calDay = CalDay.createNew(0, 0);
      });

      it('default values', function() {
        assert(calDay.isBlank === true);
        assert(calDay.day === 0);
        assert(calDay.dayWeek === 0);
        assert(calDay.weekLineRows === 0);
        assert(calDay.isToday === false);
        assert(calDay.holidayName === null);
        assert(calDay.isFurikae === false);
      });
    });

    describe('with some options', function() {
      let calDay;

      beforeEach(function() {
        calDay = CalDay.createNew(1, 2, {
          isBlank: false,
          day: 3,
          isToday: true,
          holidayName: 'Xmas',
          isFurikae: true
        });
      });

      it('customized values', function() {
        assert(calDay.isBlank === false);
        assert(calDay.day === 3);
        assert(calDay.dayWeek === 1);
        assert(calDay.weekLineRows === 2);
        assert(calDay.isToday === true);
        assert(calDay.holidayName === 'Xmas');
        assert(calDay.isFurikae === true);
      });
    });
  });
});
