import classNames from 'classnames';
import { DateTime } from 'luxon';
import { useAppSelector } from '../app/hooks';
import { selectCurrentDate } from '../features/calendar/calendarSlice';
import { DATE_FORMAT } from '../utils/Date';
import { CalendarDate } from './CalendarDate';
import { CalendarHeader } from './CalendarHeader';

const CALENDAR_ROWS = 7;

const getMonthDates = (date: DateTime): string[] => {
  let start = date.startOf('month');
  const end = date.endOf('month');
  let dates: string[] = Array(start.weekday === 7 ? 0 : start.weekday).fill('');
  while (start < end) {
    dates.push(start.toFormat(DATE_FORMAT));
    start = start.plus({ days: 1 });
  }
  dates = dates.concat(Array(Math.ceil(dates.length / CALENDAR_ROWS) * CALENDAR_ROWS - dates.length).fill(''));
  return dates;
};

export const Calendar = () => {
  const currentDate = DateTime.fromFormat(useAppSelector(selectCurrentDate), DATE_FORMAT);
  const dates = getMonthDates(currentDate);

  return (
    <div className="flex flex-col flex-1 md:max-h-calendar-home">
      <CalendarHeader />
      <div
        className={classNames(
          `w-full flex-1 grid grid-cols-1 grid-rows-1 md:grid-cols-7 truncate divide-y-2 divide-x-2`,
          `md:grid-rows-${Math.ceil(dates.length / CALENDAR_ROWS)}`,
        )}
      >
        {dates.map((date, index) => (
          <CalendarDate key={index} date={date} />
        ))}
      </div>
    </div>
  );
};
