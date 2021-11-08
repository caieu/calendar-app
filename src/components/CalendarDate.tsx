import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectDates } from '../features/calendar/calendarSlice';
import { DATE_FORMAT } from '../utils/Date';
import { ReminderCard } from './ReminderCard';

interface CalendarDateProps {
  date: string;
}

const CALENDAR_DATE_FORMAT = 'd';

export const CalendarDate = ({ date }: CalendarDateProps) => {
  const dates = useAppSelector(selectDates);
  const day = DateTime.fromFormat(date, DATE_FORMAT).toFormat(CALENDAR_DATE_FORMAT);
  return (
    <>
      {date ? (
        <div className="cursor-pointer overflow-hidden border-t-2 border-gray-200">
          <Link to={`detail?date=${date}`} className="flex flex-col p-1 flex-1 w-full h-full space-y-1 overflow-hidden">
            {day}
            {dates[date] && dates[date].map((reminderId) => <ReminderCard key={reminderId} reminderId={reminderId} />)}
          </Link>
        </div>
      ) : (
        <div className="bg-gray-100 border-t-2 border-gray-200 hidden md:inline"></div>
      )}
    </>
  );
};
