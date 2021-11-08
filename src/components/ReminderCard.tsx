import classNames from 'classnames';
import { useAppSelector } from '../app/hooks';
import { selectReminders } from '../features/calendar/calendarSlice';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { DATE_TIME_FORMAT } from '../utils/Date';

interface ReminderCardProps {
  detail?: boolean;
  reminderId: string;
}

export const ReminderCard = ({ reminderId, detail }: ReminderCardProps) => {
  const reminders = useAppSelector(selectReminders);
  const { color, text, date } = reminders[reminderId];
  return (
    <>
      {detail ? (
        <Link
          to={`/detail/reminder?id=${reminderId}`}
          className={classNames(
            'relative rounded-lg border border-gray-300 px-6 py-5 shadow-sm flex items-center space-x-3',
            'hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500',
            color,
          )}
        >
          <div className="flex-1 min-w-0">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{text}</p>
            <p className={'text-sm text-gray-500 truncate'}>
              {DateTime.fromFormat(date, DATE_TIME_FORMAT).toLocaleString(DateTime.TIME_SIMPLE)}
            </p>
          </div>
        </Link>
      ) : (
        <p className={classNames('w-full text-sm rounded-md px-1', color)}>{text}</p>
      )}
    </>
  );
};
