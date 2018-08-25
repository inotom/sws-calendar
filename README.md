# SwsCalendar

A JavaScript calendar class

## Install

```
$ npm install -D git+https://github.com/inotom/sws-calendar.git#v1.0.1
```

## Usage

```javascript
import { SwsCalendar } from 'sws-calendar';

const cal = SwsCalendar.createNew();
cal.get();       // get Array of CalDay object
cal.next();      // set next month
cal.prev();      // set previous month
cal.getYear();   // get number of year
cal.getMonth();  // get number of month (January is 1)
```
