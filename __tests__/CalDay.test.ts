/** @prettier */

import { CalDay } from '../src/CalDay';

describe('CalDay class', () => {
  describe('initialized', () => {
    describe('with no options', () => {
      let calDay: CalDay;

      beforeEach(() => {
        calDay = CalDay.createNew(0, 0);
      });

      test('default values', async () => {
        expect(calDay.isBlank).toBeTruthy();
        expect(calDay.day).toBe(0);
        expect(calDay.dayWeek).toBe(0);
        expect(calDay.weekLineRows).toBe(0);
        expect(calDay.isToday).toBeFalsy();
        expect(calDay.holidayName).toBe('');
        expect(calDay.isFurikae).toBeFalsy();
      });
    });

    describe('with some options', () => {
      let calDay: CalDay;

      beforeEach(() => {
        calDay = CalDay.createNew(1, 2, {
          isBlank: false,
          day: 3,
          isToday: true,
          holidayName: 'Xmas',
          isFurikae: true,
        });
      });

      test('customized values', async () => {
        expect(calDay.isBlank).toBeFalsy();
        expect(calDay.day).toBe(3);
        expect(calDay.dayWeek).toBe(1);
        expect(calDay.weekLineRows).toBe(2);
        expect(calDay.isToday).toBeTruthy();
        expect(calDay.holidayName).toBe('Xmas');
        expect(calDay.isFurikae).toBeTruthy();
      });
    });
  });
});
